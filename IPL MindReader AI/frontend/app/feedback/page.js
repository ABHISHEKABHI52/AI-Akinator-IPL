"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteShell } from '../../components/site-shell.js';
import { useGame } from '../../lib/game-store.js';
import { GlowButton, GlassPanel } from '../../components/ui.js';

export default function FeedbackPage() {
  const router = useRouter();
  const { submitFeedback, resetGame } = useGame();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await submitFeedback({ correct: false, actualPlayer: name });
    setSaving(false);
    resetGame();
    router.push('/analytics');
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <GlassPanel className="p-8">
          <div className="text-xs uppercase tracking-[0.3em] text-white/40">Wrong Guess Feedback</div>
          <h1 className="mt-3 text-4xl font-black text-white">Who was your player?</h1>
          <p className="mt-3 text-white/65">This correction is stored as a learning event so future sessions can improve the reasoning pattern.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter the correct IPL cricketer"
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-white/35"
            />
            <GlowButton onClick={handleSave} disabled={!name || saving}>{saving ? 'Saving...' : 'Save correction'}</GlowButton>
          </div>
        </GlassPanel>
      </div>
    </SiteShell>
  );
}
