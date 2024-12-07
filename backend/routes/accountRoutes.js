// import express from 'express';
// const router = express.Router();

// import { getCurrentAccount } from '../controllers/account_controller.js';

// // ** Account Routes **

// router.route('/current').get(getCurrentAccount);

// export default router;

import express from 'express';
import { getCurrentAccount } from '../controllers/account_controller.js';
import { isAuthenticatedUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/current').get(isAuthenticatedUser, getCurrentAccount); // Authenticated users

export default router;

