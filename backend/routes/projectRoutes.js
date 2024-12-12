import express from 'express';
import {
  addProject,
  getAllProjects,
  getStatusOptions,
  updateProjectStatus,
  updateProject,
  deleteProject,
  getProjectsStats,
  DefaultProjects
} from '../controllers/project_controller.js';
import { isAuthenticatedUser, authorizedUser } from '../middleware/authMiddleware.js';

const router = express.Router();
DefaultProjects();
router.route('/add').post(isAuthenticatedUser, authorizedUser('Admin'), addProject);
router.route('/all').get(getAllProjects);
router.route('/status-options').get(isAuthenticatedUser, authorizedUser('Admin'), getStatusOptions);
router.route('/:id/status').patch(isAuthenticatedUser, authorizedUser('Admin'), updateProjectStatus)
router.route('/update/:id').patch(isAuthenticatedUser, authorizedUser('Admin'), updateProject);
router.route('/delete/:id').delete(isAuthenticatedUser, authorizedUser('Admin'), deleteProject);
router.route('/stats').get(getProjectsStats);

export default router;


