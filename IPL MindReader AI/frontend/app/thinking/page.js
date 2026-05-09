"use client";

import { SiteShell } from '../../components/site-shell.js';
import { GameConsole } from '../../components/game-console.js';

export default function ThinkingPage() {
  return (
    <SiteShell>
      <GameConsole variant="thinking" />
    </SiteShell>
  );
}
