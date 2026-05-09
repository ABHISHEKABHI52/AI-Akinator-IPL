"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, ArrowRight, Brain, Telescope, LoaderCircle } from 'lucide-react';
import { useGame } from '../lib/game-store.js';
import { GlowButton, GlassPanel, MetricPill } from './ui.js';
import { PlayerCard } from './player-card.js';

const answerButtons = [
  { label: 'Yes', value: 'yes', className: 'border-emerald-400/30 bg-emerald-400/12 text-emerald-100' },
  { label: 'No', value: 'no', className: 'border-rose-400/30 bg-rose-400/12 text-rose-100' },
  { label: 'Maybe', value: 'maybe', className: 'border-amber-400/30 bg-amber-400/12 text-amber-100' },
  { label: 'Don’t Know', value: "don't know", className: 'border-sky-400/30 bg-sky-400/12 text-sky-100' }
];

const loadingLines = [
  'Analyzing IPL history...',
  'Scanning batting records...',
  'Comparing player profiles...',
  'Reducing candidate pool...',
  'Finding the highest information gain...'
];

export function GameConsole({ variant = 'game' }) {
  const { state, startGame, submitAnswer, resetGame, submitFeedback, setState } = useGame();
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [voiceInputActive, setVoiceInputActive] = useState(false);

  useEffect(() => {
    if (state.status !== 'thinking') {
      return;
    }
    const timer = setInterval(() => {
      setThinkingIndex((current) => (current + 1) % loadingLines.length);
    }, 1700);
    return () => clearInterval(timer);
  }, [state.status]);

  useEffect(() => {
    const handler = (event) => {
      if (state.status !== 'ready') {
        return;
      }
      const key = event.key.toLowerCase();
      if (key === 'y') submitAnswer('yes');
      if (key === 'n') submitAnswer('no');
      if (key === 'm') submitAnswer('maybe');
      if (key === '?') submitAnswer("don't know");
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state.status, submitAnswer]);

  const topGuess = useMemo(() => state.topCandidates?.[0], [state.topCandidates]);

  const toggleVoice = () => {
    setState((current) => ({ ...current, voiceEnabled: !current.voiceEnabled }));
  };

  const toggleAudio = () => {
    setState((current) => ({ ...current, audioEnabled: !current.audioEnabled }));
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    setVoiceInputActive(true);
    recognition.onresult = (event) => {
      const transcript = String(event.results[0][0].transcript || '').toLowerCase();
      if (transcript.includes('yes')) submitAnswer('yes');
      else if (transcript.includes('no')) submitAnswer('no');
      else if (transcript.includes('maybe')) submitAnswer('maybe');
      else submitAnswer("don't know");
      setVoiceInputActive(false);
    };
    recognition.onerror = () => setVoiceInputActive(false);
    recognition.onend = () => setVoiceInputActive(false);
  };

  const panel = variant === 'thinking'
    ? (
      <GlassPanel className="min-h-[70vh] border-white/15 p-8">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-glow"
          >
            <Brain className="h-12 w-12 text-gold" />
          </motion.div>
          <motion.div
            key={thinkingIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-semibold text-white"
          >
            {loadingLines[thinkingIndex]}
          </motion.div>
          <p className="mt-4 max-w-2xl text-white/60">
            The model is updating candidate probabilities, looking for the next best question, and checking whether the confidence threshold is ready for a guess.
          </p>
          <div className="mt-8 flex gap-4">
            <GlowButton onClick={startGame}>Start a Fresh Session</GlowButton>
            <GlowButton variant="secondary" onClick={resetGame}>Reset Flow</GlowButton>
          </div>
        </div>
      </GlassPanel>
    )
    : (
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
        <GlassPanel className="relative overflow-hidden border-white/15 p-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(83,201,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(247,201,72,0.12),transparent_26%)]" />
          <div className="relative p-6 sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/40">AI Question Engine</div>
                <h2 className="mt-2 text-2xl font-semibold sm:text-4xl">Ask the IPL oracle</h2>
              </div>
              <div className="flex gap-2">
                <GlowButton variant="secondary" onClick={toggleVoice}>{state.voiceEnabled ? <Mic className="mr-2 h-4 w-4" /> : <MicOff className="mr-2 h-4 w-4" />}Voice</GlowButton>
                <GlowButton variant="secondary" onClick={toggleAudio}>{state.audioEnabled ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}Audio</GlowButton>
              </div>
            </div>

            <motion.div
              animate={{ boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 44px rgba(83,201,255,0.14)', '0 0 0 rgba(0,0,0,0)'] }}
              transition={{ duration: 3.8, repeat: Infinity }}
              className="rounded-3xl border border-white/10 bg-black/30 p-6"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(247,201,72,0.2),rgba(83,201,255,0.18))]">
                  <Sparkles className="h-8 w-8 text-gold" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-white/40">AI Assistant</div>
                  <div className="text-xl font-semibold text-white">MindReader Core</div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={state.question || 'empty'}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="scanline rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="mb-3 text-xs uppercase tracking-[0.28em] text-white/40">Current Question</div>
                  <div className="text-2xl font-semibold leading-tight text-white sm:text-4xl">
                    {state.question || 'Start the game to let the AI think.'}
                  </div>
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-white/65 sm:text-base">{state.aiReasoning || 'The engine will explain why this question was selected and how it reduces the candidate pool.'}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <MetricPill label="Confidence" value={`${Math.round((state.confidence || 0) * 100)}%`} tone="blue" />
                <MetricPill label="Players left" value={state.candidateCount || 0} />
                <MetricPill label="Eliminated" value={state.eliminatedCount || 0} />
              </div>
            </motion.div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.26em] text-white/40"><Telescope className="h-4 w-4 text-blueglow" />Live reasoning</div>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  The engine continuously updates probabilities after each answer. It prefers questions that separate the remaining pool as close to a 50/50 split as possible.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.26em] text-white/40"><LoaderCircle className="h-4 w-4 text-gold" />Session status</div>
                <p className="mt-3 text-sm leading-6 text-white/70">{state.status === 'thinking' ? 'AI is recalculating the next move.' : 'Waiting for your answer.'}</p>
              </div>
            </div>
          </div>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel className="border-white/15 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/40">Probability Scanner</div>
                <h3 className="mt-2 text-2xl font-semibold text-white">Candidate pool</h3>
              </div>
              <GlowButton variant="secondary" onClick={startGame}>Refresh</GlowButton>
            </div>

            <div className="space-y-4">
              <div className="h-3 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  animate={{ width: `${Math.max(10, Math.min(100, Math.round((state.confidence || 0) * 100)))}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-[linear-gradient(90deg,#f7c948,#53c9ff)]"
                />
              </div>

              {topGuess ? <PlayerCard player={topGuess} highlight /> : <div className="rounded-3xl border border-dashed border-white/10 p-6 text-white/50">Top candidate will appear here after the first answer.</div>}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-white/40">Confidence</div>
                  <div className="mt-1 text-2xl font-bold text-gold">{Math.round((state.confidence || 0) * 100)}%</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-white/40">Progress</div>
                  <div className="mt-1 text-2xl font-bold text-blueglow">{state.progress || 0}%</div>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="border-white/15 p-6">
            <div className="mb-4 text-xs uppercase tracking-[0.28em] text-white/40">Answer with intent</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {answerButtons.map((button) => (
                <motion.button
                  key={button.value}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => submitAnswer(button.value)}
                  className={`rounded-2xl border px-4 py-4 text-sm font-semibold transition ${button.className}`}
                >
                  {button.label}
                </motion.button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <GlowButton variant="secondary" onClick={startVoiceRecognition}>
                {voiceInputActive ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Mic className="mr-2 h-4 w-4" />}
                Speak Answer
              </GlowButton>
              <GlowButton variant="ghost" onClick={() => submitFeedback({ type: 'nav', message: 'User opened the answer deck.' })}>
                Send telemetry
              </GlowButton>
            </div>
          </GlassPanel>
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {state.status === 'error' && (
        <div className="mb-6 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{state.error}</div>
      )}
      {panel}
      {variant !== 'thinking' && !state.sessionId && (
        <div className="mt-6 flex justify-center">
          <GlowButton onClick={startGame}>Start AI Session</GlowButton>
        </div>
      )}
    </div>
  );
}
