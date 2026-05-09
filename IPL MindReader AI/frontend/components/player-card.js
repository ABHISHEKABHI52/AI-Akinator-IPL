"use client";

import { motion } from 'framer-motion';

function initials(name) {
  return String(name || '')
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function PlayerCard({ player, highlight = false }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-4 ${highlight ? 'shadow-glow' : ''}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(83,201,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(247,201,72,0.16),transparent_25%)]" />
      <div className="relative flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-xl font-bold text-gold">
          {initials(player?.name)}
        </div>
        <div className="min-w-0">
          <div className="truncate text-lg font-semibold text-white">{player?.name}</div>
          <div className="text-xs uppercase tracking-[0.24em] text-white/50">{player?.teamCode || player?.teams?.[0] || 'IPL'}</div>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-white/60">
            <span className="rounded-full border border-white/10 px-2 py-1">{player?.role}</span>
            {player?.country && <span className="rounded-full border border-white/10 px-2 py-1">{player.country}</span>}
            {player?.overseas && <span className="rounded-full border border-white/10 px-2 py-1 text-blueglow">Overseas</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
