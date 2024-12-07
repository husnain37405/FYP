import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import projectRoutes from './projectRoutes.js';
import donationRoutes from './donationRoutes.js';
import requestRoutes from './requestRoutes.js';
import accountRoutes from './accountRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/donations', donationRoutes);
router.use('/requests', requestRoutes);
router.use('/account', accountRoutes);

export default router;
