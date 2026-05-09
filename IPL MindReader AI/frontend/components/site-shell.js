"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gamepad2, Radar, BarChart3, Shield, Sparkles } from 'lucide-react';
import { GlowButton } from './ui.js';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/game', label: 'Play' },
  { href: '/thinking', label: 'Thinking' },
  { href: '/guess', label: 'Reveal' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/admin', label: 'Admin' }
];

export function SiteShell({ children }) {
  return (
    <div className="min-h-screen bg-stadium text-white">
      <div className="hero-radial" />
      <div className="aurora" />
      <div className="grid-noise absolute inset-0 opacity-30" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-glow">
              <Sparkles className="h-5 w-5 text-gold" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">IPL MindReader AI</div>
              <div className="text-xs text-white/40">Akinator-grade cricket intelligence</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/8 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <GlowButton variant="secondary" className="hidden sm:inline-flex">
              <Radar className="mr-2 h-4 w-4" />
              Live AI
            </GlowButton>
            <Link href="/game">
              <GlowButton>
                <Gamepad2 className="mr-2 h-4 w-4" />
                Play Now
              </GlowButton>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-white/60 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <div className="mb-3 text-white">IPL MindReader AI</div>
            <p>Premium adaptive IPL guessing engine with probabilistic reasoning, cinematic UI, and server-side AI orchestration.</p>
          </div>
          <div>
            <div className="mb-3 text-white">Core Modules</div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 px-3 py-1">Adaptive Questions</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Probability Engine</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Gemini AI</span>
              <span className="rounded-full border border-white/10 px-3 py-1">FireStore Learning</span>
            </div>
          </div>
          <div>
            <div className="mb-3 text-white">Safety</div>
            <p>All secrets stay in server-side env files. The frontend only uses a public API base URL.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
