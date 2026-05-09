"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from './api.js';

const GameContext = createContext(null);

const initialState = {
  sessionId: null,
  question: '',
  aiReasoning: '',
  candidateCount: 0,
  confidence: 0,
  progress: 0,
  eliminatedCount: 0,
  topCandidates: [],
  answerHistory: [],
  activeGuess: null,
  status: 'idle',
  error: null,
  questionId: null,
  voiceEnabled: true,
  audioEnabled: false,
  analytics: null
};

export function GameProvider({ children }) {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const lastQuestionRef = useRef('');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('ipl-mindreader-session');
      if (raw) {
        setState((current) => ({ ...current, ...JSON.parse(raw), status: 'ready' }));
      }
    } catch (_error) {
      // Ignore storage failures.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('ipl-mindreader-session', JSON.stringify({
        sessionId: state.sessionId,
        question: state.question,
        aiReasoning: state.aiReasoning,
        candidateCount: state.candidateCount,
        confidence: state.confidence,
        progress: state.progress,
        eliminatedCount: state.eliminatedCount,
        topCandidates: state.topCandidates,
        answerHistory: state.answerHistory,
        activeGuess: state.activeGuess,
        questionId: state.questionId,
        voiceEnabled: state.voiceEnabled,
        audioEnabled: state.audioEnabled
      }));
    } catch (_error) {
      // Ignore storage failures.
    }
  }, [state]);

  useEffect(() => {
    if (!state.voiceEnabled || !state.question || state.question === lastQuestionRef.current) {
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(state.question);
      utterance.rate = 0.95;
      utterance.pitch = 0.9;
      window.speechSynthesis.speak(utterance);
    }

    lastQuestionRef.current = state.question;
  }, [state.question, state.voiceEnabled]);

  const startGame = async () => {
    setState((current) => ({ ...current, status: 'thinking', error: null }));
    try {
      const response = await api.startGame();
      setState((current) => ({
        ...current,
        sessionId: response.sessionId,
        question: response.question,
        aiReasoning: response.aiReasoning,
        candidateCount: response.candidateCount,
        confidence: response.confidence,
        progress: response.progress,
        eliminatedCount: response.eliminatedCount,
        topCandidates: response.topCandidates,
        questionId: response.questionId,
        status: 'ready',
        error: null
      }));
    } catch (error) {
      setState((current) => ({ ...current, status: 'error', error: error.message }));
    }
  };

  const submitAnswer = async (answer) => {
    if (!state.sessionId) {
      await startGame();
      return;
    }

    setState((current) => ({ ...current, status: 'thinking', error: null }));
    try {
      const response = await api.submitAnswer({ sessionId: state.sessionId, questionId: state.questionId, answer });
      const nextHistory = [...state.answerHistory, { question: state.question, answer }];

      if (response.done) {
        setState((current) => ({
          ...current,
          status: 'guess',
          activeGuess: response,
          candidateCount: response.candidatesLeft,
          confidence: response.confidence,
          progress: response.progress,
          eliminatedCount: response.eliminatedCount,
          topCandidates: response.topCandidates,
          answerHistory: nextHistory,
          question: response.player?.name ? `You are thinking of ${response.player.name}, right?` : 'I have my guess ready.',
          aiReasoning: response.reasoning,
          questionId: null
        }));
        router.push('/guess');
        return;
      }

      setState((current) => ({
        ...current,
        sessionId: response.sessionId,
        question: response.question,
        aiReasoning: response.aiReasoning,
        candidateCount: response.candidateCount,
        confidence: response.confidence,
        progress: response.progress,
        eliminatedCount: response.eliminatedCount,
        topCandidates: response.topCandidates,
        answerHistory: nextHistory,
        questionId: response.questionId || current.questionId,
        status: 'ready',
        error: null
      }));
    } catch (error) {
      setState((current) => ({ ...current, status: 'error', error: error.message }));
    }
  };

  const submitFeedback = async (payload) => {
    try {
      await api.submitFeedback({ sessionId: state.sessionId, ...payload });
    } catch (_error) {
      // Feedback should not block the flow.
    }
  };

  const resetGame = () => {
    setState(initialState);
    try {
      window.localStorage.removeItem('ipl-mindreader-session');
    } catch (_error) {
      // Ignore.
    }
    router.push('/');
  };

  const value = {
    state,
    setState,
    startGame,
    submitAnswer,
    submitFeedback,
    resetGame
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used inside GameProvider');
  }
  return context;
}
