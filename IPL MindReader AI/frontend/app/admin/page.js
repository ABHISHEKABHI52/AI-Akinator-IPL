"use client";

import { useEffect, useState } from 'react';
import { SiteShell } from '../../components/site-shell.js';
import { api } from '../../lib/api.js';
import { GlassPanel } from '../../components/ui.js';

export default function AdminPage() {
  const [dataset, setDataset] = useState(null);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    api.getDatasetStats().then(setDataset).catch(() => setDataset(null));
    api.getAdminHealth().then(setHealth).catch(() => setHealth(null));
  }, []);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassPanel>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40">Dataset panel</div>
            <h1 className="mt-3 text-3xl font-black">Learning corpus</h1>
            <p className="mt-3 text-white/65">This panel surfaces the generated catalog used for reasoning and the first few records for quick inspection.</p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4 text-white/70">
              <div>Count: {dataset?.count || 'Loading...'}</div>
              <div className="mt-2 text-sm text-white/45">Sample loaded from backend dataset endpoint.</div>
            </div>
          </GlassPanel>
          <GlassPanel>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40">Service health</div>
            <h2 className="mt-3 text-3xl font-black">Production status</h2>
            <p className="mt-3 text-white/65">Backend health and session counters are exposed here for hackathon ops visibility.</p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4 text-white/70">
              <div>Healthy: {health?.ok ? 'Yes' : 'Loading...'}</div>
              <div className="mt-2 text-sm text-white/45">Sessions: {health?.sessions || 0}</div>
            </div>
          </GlassPanel>
        </div>

        <GlassPanel className="mt-6">
          <div className="text-xs uppercase tracking-[0.3em] text-white/40">Preview sample</div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {(dataset?.sample || []).map((player) => (
              <div key={player.name} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="text-white">{player.name}</div>
                <div className="text-sm text-white/45">{player.role} • {player.teamCode || player.teams?.[0]}</div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </SiteShell>
  );
}
