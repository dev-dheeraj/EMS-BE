import { Router } from 'express';
import { loginUser, register } from './auth.controller.js';
import { authenticateToken } from '../../middlewares/authMiddleware.js';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', loginUser);

// Example Protected Route
authRoutes.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'Profile data', user: req.user });
});


export default authRoutes;
