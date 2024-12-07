// import express from 'express';
// const router = express.Router();

// import {
//   getAllUsers,
//   getUserStats,
//   getUserDetails,
//   deleteUserById,
//   deleteMultipleUsers,
// } from '../controllers/user_controller.js';
    
// router.route('/').get(getAllUsers);               
// router.route('/stats').get(getUserStats);         
// router.route('/profile').get(getUserDetails);     
// router.route('/:id').delete(deleteUserById);     
// router.route('/batch').delete(deleteMultipleUsers); 



// export default router;

import express from 'express';
import { 
  getAllUsers, 
  getUserStats, 
  getUserDetails, 
  deleteUserById, 
  deleteMultipleUsers,
  updateUser
} from '../controllers/user_controller.js';
import { isAuthenticatedUser, authorizedUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(isAuthenticatedUser, authorizedUser('Admin'), getAllUsers); // Admin-only
router.route('/stats').get(getUserStats);     
router.route('/profile').get(isAuthenticatedUser, getUserDetails); // Authenticated users
router.route('/:id').delete(isAuthenticatedUser, authorizedUser('Admin'), deleteUserById); // Admin-only
router.route('/batch').delete(isAuthenticatedUser, authorizedUser('Admin'), deleteMultipleUsers); // Admin-only
router.route('/update').patch(updateUser);
export default router;
