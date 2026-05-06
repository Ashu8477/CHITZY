import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

import { connectionDB } from './lib/db.js';
import { app, server } from './lib/socket.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: [
      'https://chitzy-ra2c.vercel.app',
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials: true,
  }),
);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectionDB();
});
