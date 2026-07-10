import express from 'express';
import { getSessions, createSession, deleteSession } from '../controllers/session.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getSessions);
router.post('/', protect, createSession);
router.delete('/:id', protect, deleteSession);

export default router;