import express from 'express';
import { getCurrentAccount } from '../controllers/account_controller.js';
import { isAuthenticatedUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/current').get(isAuthenticatedUser, getCurrentAccount);

export default router;

