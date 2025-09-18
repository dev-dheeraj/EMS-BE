import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import authRoutes from './modules/auth/auth.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Server up...' });
});
//  Auth routes
app.use('/auth', authRoutes)


// Check for DB connection
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send({ status: 'healthy', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', db: 'disconnected', error: error.message });
  }
});

process.on('SIGINT', async () => {
  console.log('Closing server...');
  await sequelize.close();  // Close DB connection
  process.exit(0);
});

export default app;
