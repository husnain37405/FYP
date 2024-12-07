// import express from 'express';
// const router = express.Router();
// import {addDonation, getDonations, handleStripeWebhook} from '../controllers/donation_controller.js';
// import { stripeInvestmentPayment } from '../controllers/paymentController.js';
// // ** Donation Routes **
// router.route('/add').post(addDonation);
// // Handle Stripe webhook for payment notifications
// router.route('/stripe-webhook').post(express.raw({ type: 'application/json' }), handleStripeWebhook);
// // Process a payment (if using a different payment flow)
// router.route('/payment').post(stripeInvestmentPayment);
// router.route('/all').get(getDonations);
// export default router;

import express from 'express';
import {addDonation,
     getDonationsStats , 
     getAllDonations, 
     getDonorDonations, 
     getDonorTotalDonationsCount,
     getDonorTotalDonatedAmount,
     handleStripeWebhook} from '../controllers/donation_controller.js';
import { stripeInvestmentPayment } from '../controllers/paymentController.js';
import { isAuthenticatedUser, authorizedUser } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/add').post(isAuthenticatedUser, addDonation);
// router.route('/add').post(isAuthenticatedUser,authorizedUser('Donor'), addDonation); // Donors-only 
router.route('/stripe-webhook').post(express.raw({ type: 'application/json' }), handleStripeWebhook); 
router.route('/payment').post(isAuthenticatedUser, stripeInvestmentPayment); // Authenticated users
router.route('/all').get(isAuthenticatedUser, authorizedUser('Admin'), getAllDonations); // Admin-only
router.route('/donorDonations').get(isAuthenticatedUser, authorizedUser('Donor'), getDonorDonations);//Donor only
router.route('/stats').get(getDonationsStats);//Total Donation Count
router.route('/donorTotalDonationsCount').get(isAuthenticatedUser, authorizedUser('Donor'), getDonorTotalDonationsCount);
router.route('/donorTotalDonatedAmount').get(isAuthenticatedUser, authorizedUser('Donor'),  getDonorTotalDonatedAmount);

export default router;



