import express from 'express';
import {
     addDonation,
     getDonationsStats,
     getAllDonations,
     getDonorDonations,
     getDonorTotalDonationsCount,
     getDonorTotalDonatedAmount,
     handleStripeWebhook
} from '../controllers/donation_controller.js';
import { stripeInvestmentPayment } from '../controllers/paymentController.js';
import { isAuthenticatedUser, authorizedUser } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/add').post(isAuthenticatedUser, addDonation);
router.route('/stripe-webhook').post(express.raw({ type: 'application/json' }), handleStripeWebhook);
router.route('/payment').post(isAuthenticatedUser, stripeInvestmentPayment); // Authenticated users
router.route('/all').get(isAuthenticatedUser, authorizedUser('Admin'), getAllDonations); // Admin-only
router.route('/donorDonations').get(isAuthenticatedUser, authorizedUser('Donor'), getDonorDonations);//Donor only
router.route('/stats').get(getDonationsStats);//Total Donation Count
router.route('/donorTotalDonationsCount').get(isAuthenticatedUser, authorizedUser('Donor'), getDonorTotalDonationsCount);
router.route('/donorTotalDonatedAmount').get(isAuthenticatedUser, authorizedUser('Donor'), getDonorTotalDonatedAmount);

export default router;



