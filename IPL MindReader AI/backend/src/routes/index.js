import { Router } from 'express';
import { createGameRouter } from './gameRoutes.js';
import { createAdminRouter } from './adminRoutes.js';

export const gameRouter = Router();
gameRouter.use('/game', createGameRouter());
gameRouter.use('/admin', createAdminRouter());
