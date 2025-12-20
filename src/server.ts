// src/server.ts
import express from 'express';
import authRouter from './app/api/auth/route';
import farmersRouter from './app/api/farmers/route';
import practicesRouter from './app/api/practices/route';
import attestationsRouter from './app/api/attestations/route';
import reputationRouter from './app/api/reputation/route';
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Mount all API routes
app.use('/api/auth', authRouter);
app.use('/api/farmers', farmersRouter);
app.use('/api/practices', practicesRouter);
app.use('/api/attestations', attestationsRouter);
app.use('/api/reputation', reputationRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Imani Backend is running! 🌱' });
});

app.listen(PORT, () => {
  console.log(`🚀 Imani backend server running on http://localhost:${PORT}`);
});