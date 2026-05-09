import { Router } from 'express';
import { analyticsService } from '../services/analyticsService.js';
import { getDatasetMeta, getPlayerCatalog } from '../data/playerSeeds.js';

export function createAdminRouter() {
  const router = Router();

  router.get('/dataset', (_req, res) => {
    const players = getPlayerCatalog();
    const meta = getDatasetMeta();
    res.json({ count: meta.rawCount, uniqueCount: meta.uniqueCount, sample: players.slice(0, 20), hasGenerated: meta.hasGenerated });
  });

  router.get('/health', (_req, res) => {
    res.json({ ok: true, sessions: analyticsService.getDashboard().sessions });
  });

  return router;
}
