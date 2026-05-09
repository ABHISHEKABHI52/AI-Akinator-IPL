"use client";

import { SiteShell } from '../../components/site-shell.js';
import { GameConsole } from '../../components/game-console.js';
import { useGame } from '../../lib/game-store.js';
import { useEffect } from 'react';

export default function GamePage() {
  const { startGame, state } = useGame();

  useEffect(() => {
    if (!state.sessionId && state.status === 'idle') {
      startGame();
    }
  }, [state.sessionId, state.status, startGame]);

  return (
    <SiteShell>
      <GameConsole />
    </SiteShell>
  );
}
