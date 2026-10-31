import { app } from './app.js';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`[Food Safety Server] Running on http://localhost:${PORT}`);
  console.log(`[Food Safety Server] SQLite Database active with foreign keys`);
  console.log(`[Food Safety Server] API Endpoints ready: /api/donations, /api/safety`);
});
