import dotenv from 'dotenv';
import { createApp } from './app.js';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = createApp();
const port = Number(process.env.BACKEND_PORT || 4001);

app.listen(port, () => {
  console.log(`IPL MindReader API running on http://localhost:${port}`);
});
