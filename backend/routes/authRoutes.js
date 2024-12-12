import express from 'express';
const router = express.Router();

import {
    registerNewUser,
    loginUser,
    logoutUser
} from "../controllers/authController.js"
import { isAuthenticatedUser } from '../middleware/authMiddleware.js'

router.route('/register').post(registerNewUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/verifyUserToken').get(isAuthenticatedUser);

export default router;
