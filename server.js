import express from 'express';
import dotenv from 'dotenv';
import "dotenv/config";
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
