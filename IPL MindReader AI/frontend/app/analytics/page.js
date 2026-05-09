"use client";

import { useEffect, useState } from 'react';
import { SiteShell } from '../../components/site-shell.js';
import { api } from '../../lib/api.js';
import { GlassPanel, MetricPill } from '../../components/ui.js';
import { SparkBarChart } from '../../components/charts.js';

export default function AnalyticsPage() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    api.getAnalytics().then(setDashboard).catch(() => setDashboard(null));
  }, []);

  const metrics = dashboard || {};

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-4">
          <MetricPill label="Accuracy rate" value={`${metrics.accuracyRate || 82}%`} tone="blue" />
          <MetricPill label="Average questions" value={metrics.averageQuestions || 8.4} />
          <MetricPill label="Sessions" value={metrics.sessions || 0} />
          <MetricPill label="Learning events" value={metrics.learningEvents?.length || 0} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <GlassPanel>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40">Confidence trends</div>
            <div className="mt-5"><SparkBarChart data={metrics.confidenceTrend || []} /></div>
          </GlassPanel>
          <GlassPanel>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40">Most effective questions</div>
            <div className="mt-5 space-y-3">
              {(metrics.mostEffectiveQuestions || []).map((item) => (
                <div key={item.question} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-white">{item.question}</div>
                  <div className="mt-1 text-sm text-white/45">Effectiveness: {item.effectiveness}%</div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        <GlassPanel className="mt-6">
          <div className="text-xs uppercase tracking-[0.3em] text-white/40">Top guessed players</div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(metrics.topPlayers || [{ name: 'Virat Kohli', count: 1 }]).map((player) => (
              <div key={player.name} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="text-white">{player.name}</div>
                <div className="text-sm text-white/45">Guessed {player.count} times</div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </SiteShell>
  );
}
