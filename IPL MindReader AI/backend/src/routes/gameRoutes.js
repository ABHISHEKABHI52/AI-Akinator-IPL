import { Router } from 'express';
import { nanoid } from 'nanoid';
import { getPlayerCatalog } from '../data/playerSeeds.js';
import { createReasoningEngine } from '../lib/iplReasoning.js';
import { sessionStore } from '../services/sessionStore.js';
import { analyticsService } from '../services/analyticsService.js';
import { askGeminiForQuestion } from '../config/gemini.js';

export function createGameRouter() {
  const router = Router();

  router.post('/start', async (_req, res, next) => {
    try {
      const sessionId = nanoid(12);
      const engine = createReasoningEngine(getPlayerCatalog());
      let state = engine.createState();
      state = engine.assignNextQuestion(state);

      sessionStore.set(sessionId, { state, engine, history: [] });

      const aiQuestion = await askGeminiForQuestion({
        state,
        fallbackQuestion: engine.nextQuestion(state),
        mode: 'start'
      });

      const snapshot = engine.snapshot(state);
      res.json({
        sessionId,
        questionId: state.currentQuestionId,
        question: aiQuestion.question,
        aiReasoning: aiQuestion.reasoning,
        ...snapshot
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/answer', async (req, res, next) => {
    try {
      const { sessionId, questionId, answer } = req.body || {};
      const session = sessionStore.get(sessionId);

      if (!session) {
        return res.status(404).json({ error: 'SESSION_NOT_FOUND' });
      }

      const nextState = session.engine.applyAnswer(session.state, questionId, answer);
      session.history.push({ questionId, answer, at: new Date().toISOString() });

      if (session.engine.shouldGuess(nextState)) {
        const guess = session.engine.buildGuess(nextState);
        await analyticsService.recordSession({ sessionId, ...guess, history: session.history });
        sessionStore.set(sessionId, { ...session, state: nextState });
        return res.json({
          sessionId,
          done: true,
          ...guess,
          ...session.engine.snapshot(nextState)
        });
      }

      const stagedState = session.engine.assignNextQuestion(nextState);
      const aiQuestion = await askGeminiForQuestion({
        state: stagedState,
        fallbackQuestion: session.engine.nextQuestion(stagedState),
        mode: 'followup'
      });

      const snapshot = session.engine.snapshot(stagedState);
      sessionStore.set(sessionId, { ...session, state: stagedState });

      return res.json({
        sessionId,
        done: false,
        questionId: stagedState.currentQuestionId,
        question: aiQuestion.question,
        aiReasoning: aiQuestion.reasoning,
        ...snapshot
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/feedback', async (req, res, next) => {
    try {
      await analyticsService.recordFeedback(req.body || {});
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  router.get('/analytics', (_req, res) => {
    res.json(analyticsService.getDashboard());
  });

  return router;
}
