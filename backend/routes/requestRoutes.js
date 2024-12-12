import express from 'express';
import {
     addRequest, getAllRequests,
     getRequestersRequest, deleteRequest,
     getRequestsStats, updateReq,
     requesterUpdateReq
} from '../controllers/request_controller.js';
import { isAuthenticatedUser, authorizedUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/add').post(isAuthenticatedUser, addRequest);
router.route('/all').get(isAuthenticatedUser, authorizedUser('Admin'), getAllRequests);
router.route('/stats').get(getRequestsStats);
router.route('/requesterRequestUpdate/:id').patch(isAuthenticatedUser, authorizedUser('Requester'), requesterUpdateReq);
router.route('/update/:id').patch(isAuthenticatedUser, authorizedUser('Admin'), updateReq);
router.route('/requesterRequests').get(isAuthenticatedUser, authorizedUser('Requester'), getRequestersRequest);
router.route('/requesterRequests/:id').delete(isAuthenticatedUser, authorizedUser('Requester'), deleteRequest);

export default router;


