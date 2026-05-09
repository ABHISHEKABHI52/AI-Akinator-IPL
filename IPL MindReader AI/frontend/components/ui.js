"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function GlassPanel({ className = '', children }) {
  return <div className={cn('glass rounded-3xl p-6', className)}>{children}</div>;
}

export function GlowButton({ children, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-[linear-gradient(135deg,#f7c948_0%,#f4d97a_40%,#53c9ff_100%)] text-black shadow-glow',
    secondary: 'border border-white/15 bg-white/5 text-white hover:bg-white/10',
    ghost: 'bg-transparent text-white/80 hover:text-white hover:bg-white/5'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function MetricPill({ label, value, tone = 'gold' }) {
  const toneClass = tone === 'blue' ? 'text-blueglow' : 'text-gold';
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">{label}</div>
      <div className={cn('mt-1 text-2xl font-bold', toneClass)}>{value}</div>
    </div>
  );
}
