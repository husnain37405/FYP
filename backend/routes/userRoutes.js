import express from 'express';
import {
  getAllUsers,
  getUserStats,
  getUserDetails,
  deleteUserById,
  deleteMultipleUsers,
  updateUserByAdmin,
  updateUser
} from '../controllers/user_controller.js';
import { isAuthenticatedUser, authorizedUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(isAuthenticatedUser, authorizedUser('Admin'), getAllUsers);
router.route('/stats').get(getUserStats);
router.route('/profile').get(isAuthenticatedUser, getUserDetails);
router.route('/:id').delete(isAuthenticatedUser, authorizedUser('Admin'), deleteUserById);
router.route('/batch').delete(isAuthenticatedUser, authorizedUser('Admin'), deleteMultipleUsers);
router.route('/:id').put(isAuthenticatedUser, authorizedUser('Admin'), updateUserByAdmin)
router.route('/update').patch(updateUser);
export default router;
