import express from 'express';
import cors from 'cors';
import { gameRouter } from './routes/index.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '2mb' }));

  app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'ipl-mindreader-ai' });
  });

  app.use('/api', gameRouter);

  app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: error?.message || 'Something went wrong'
    });
  });

  return app;
}
