"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Trophy, Sparkles, Radar, Shield, Zap } from 'lucide-react';
import { SiteShell } from '../components/site-shell.js';
import { GlowButton, GlassPanel } from '../components/ui.js';
import { PlayerCard } from '../components/player-card.js';

const floatingPlayers = [
  { name: 'Virat Kohli', role: 'batter', teamCode: 'RCB', overseas: false },
  { name: 'MS Dhoni', role: 'wicketkeeper', teamCode: 'CSK', overseas: false },
  { name: 'Rashid Khan', role: 'bowler', teamCode: 'GT', overseas: true }
];

const statCards = [
  { label: 'Average questions', value: '8.4' },
  { label: 'Guess accuracy', value: '82%' },
  { label: 'Players tracked', value: '1000+' },
  { label: 'Model confidence', value: '92%' }
];

export default function HomePage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/65"
            >
              <Sparkles className="h-4 w-4 text-gold" />
              National-level AI Hackathon Demo
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-8xl"
            >
              <span className="text-gradient">Can You Beat</span>
              <br />
              <span className="text-white">The IPL AI?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl"
            >
              A cinematic Akinator-style cricket analyst that uses adaptive questioning, probabilistic reasoning, and Gemini-powered explanations to identify any IPL cricketer with ruthless precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/game"><GlowButton><ArrowRight className="mr-2 h-4 w-4" />Start Game</GlowButton></Link>
              <Link href="/analytics"><GlowButton variant="secondary"><BrainCircuit className="mr-2 h-4 w-4" />View Intelligence</GlowButton></Link>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map((card, index) => (
                <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.08 }}>
                  <GlassPanel className="h-full p-5">
                    <div className="text-xs uppercase tracking-[0.28em] text-white/45">{card.label}</div>
                    <div className="mt-2 text-3xl font-black text-gold">{card.value}</div>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-xl"
            >
              <GlassPanel className="relative overflow-hidden p-6 sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(247,201,72,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(83,201,255,0.18),transparent_20%)]" />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between text-sm text-white/60">
                    <span>Live AI Scouting Board</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">Gemini Active</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {floatingPlayers.map((player, index) => (
                      <motion.div key={player.name} animate={{ rotate: [0, index % 2 === 0 ? 1.2 : -1.2, 0] }} transition={{ duration: 6 + index, repeat: Infinity }}>
                        <PlayerCard player={player} highlight={index === 0} />
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <Radar className="h-5 w-5 text-blueglow" />
                      <div className="mt-3 text-sm text-white/45">Question engine</div>
                      <div className="text-lg font-semibold">Entropy-driven</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <Zap className="h-5 w-5 text-gold" />
                      <div className="mt-3 text-sm text-white/45">Behavior</div>
                      <div className="text-lg font-semibold">Conversational</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <Shield className="h-5 w-5 text-white" />
                      <div className="mt-3 text-sm text-white/45">Security</div>
                      <div className="text-lg font-semibold">Server-side AI</div>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ['How It Works', 'Think of any IPL cricketer. The AI asks the most informative question first and keeps shrinking the candidate pool.'],
            ['AI Intelligence', 'Every answer updates a weighted probability distribution so the next question is more precise than the last.'],
            ['Adaptive Reasoning', 'Questions are selected dynamically using information gain and model-assisted explanations, not a static tree.']
          ].map(([title, body]) => (
            <GlassPanel key={title} className="p-6">
              <div className="text-sm uppercase tracking-[0.3em] text-white/45">{title}</div>
              <p className="mt-4 text-white/68 leading-7">{body}</p>
            </GlassPanel>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
