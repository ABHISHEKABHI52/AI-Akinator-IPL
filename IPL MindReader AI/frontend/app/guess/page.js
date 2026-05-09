"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, ArrowLeft } from 'lucide-react';
import { SiteShell } from '../../components/site-shell.js';
import { useGame } from '../../lib/game-store.js';
import { PlayerCard } from '../../components/player-card.js';
import { GlowButton, GlassPanel } from '../../components/ui.js';

export default function GuessPage() {
  const router = useRouter();
  const { state, submitFeedback } = useGame();
  const guess = state.activeGuess?.player || state.topCandidates?.[0];

  const handleCorrect = async () => {
    await submitFeedback({ correct: true, playerName: guess?.name, confidence: state.confidence });
    router.push('/analytics');
  };

  const handleWrong = async () => {
    await submitFeedback({ correct: false, playerName: guess?.name, confidence: state.confidence });
    router.push('/feedback');
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <GlassPanel className="relative overflow-hidden p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(247,201,72,0.16),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(83,201,255,0.16),transparent_22%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/60">
                <Sparkles className="h-4 w-4 text-gold" />
                Final Reveal
              </div>
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl">You are thinking of {guess?.name || 'an IPL player'}, right?</h1>
              <p className="mt-4 max-w-xl text-white/65">
                The model has crossed the confidence threshold. It reached this guess by repeatedly reducing entropy and prioritizing the strongest remaining candidate.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-white/45 text-sm">Confidence</div><div className="mt-1 text-2xl font-bold text-gold">{Math.round((state.confidence || 0) * 100)}%</div></div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-white/45 text-sm">Questions</div><div className="mt-1 text-2xl font-bold text-blueglow">{state.answerHistory?.length || 0}</div></div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-white/45 text-sm">Pool left</div><div className="mt-1 text-2xl font-bold text-white">{state.candidateCount || 0}</div></div>
              </div>
            </motion.div>

            <div className="space-y-5">
              <PlayerCard player={guess || { name: 'Unknown Player', role: 'IPL' }} highlight />
              <GlassPanel className="p-6">
                <div className="text-xs uppercase tracking-[0.3em] text-white/40">Reasoning Summary</div>
                <p className="mt-3 text-white/70 leading-7">{state.aiReasoning || state.activeGuess?.reasoning || 'The AI converged on the most likely IPL profile.'}</p>
              </GlassPanel>
              <div className="flex flex-wrap gap-3">
                <GlowButton onClick={handleCorrect}><Check className="mr-2 h-4 w-4" />Correct</GlowButton>
                <GlowButton variant="secondary" onClick={handleWrong}><X className="mr-2 h-4 w-4" />Wrong</GlowButton>
                <GlowButton variant="ghost" onClick={() => router.push('/game')}><ArrowLeft className="mr-2 h-4 w-4" />Back to game</GlowButton>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </SiteShell>
  );
}
