"use client";

import { GameProvider } from '../lib/game-store.js';

export function Providers({ children }) {
  return <GameProvider>{children}</GameProvider>;
}
