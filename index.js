import express from 'express';
const app = express();
const port = 3000;
import taskRoutes from './routes/tasks.js'
import  authRoutes from './routes/auth.js'
import  authenticateToken from './middleware/auth.js';

import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/tasks',authenticateToken, taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
