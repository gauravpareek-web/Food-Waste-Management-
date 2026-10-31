import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'node:path';
import { initDatabase } from './db/database.js';
import { donationRouter } from './routes/donationRoutes.js';
import { safetyRouter } from './routes/safetyRoutes.js';

export const app = express();

// Initialize SQLite database & migrations
initDatabase();

// Security & Parsing Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded photos securely
const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');
app.use('/uploads', express.static(UPLOAD_DIR));

// Healthcheck
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Food Safety & Hygiene Engine',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/donations', donationRouter);
app.use('/api/safety', safetyRouter);

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction): any => {
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`,
    });
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'An unexpected error occurred',
    });
  }
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});
