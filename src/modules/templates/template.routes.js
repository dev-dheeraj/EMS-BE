import { Router } from 'express';
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { createTemplate, getAllTemplates, getTemplatesByUser } from './template.controller.js';

const templateRoutes = Router();

templateRoutes.post('/createTemplate', authenticateToken, createTemplate);
templateRoutes.get('/getAllTemplates', authenticateToken, getAllTemplates);
templateRoutes.get('/getTemplatesByUser/:userId', authenticateToken, getTemplatesByUser);

export default templateRoutes;

