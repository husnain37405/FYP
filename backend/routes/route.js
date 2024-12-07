// import express from 'express';
// import { 
//    userRegister, 
//    userLogIn, 
//    getusers, 
//    getUserStats,
//    getuserDetail, 
//    deleteusers, 
//    deleteuser 
// } from '../controllers/user_controller.js';

// import { 
//    addProject, 
//    updateProject, 
//    getProjects, 
//    deleteProject 
// } from '../controllers/project_controller.js';

// import { 
//    addDonation, 
//    getDonations, 
//    handleStripeWebhook 
// } from '../controllers/donation_controller.js';

// import { 
//    addRequest, 
//    updateReq, 
//    getRequests 
// } from '../controllers/request_controller.js';

// import { getCurrentAccount } from '../controllers/account_controller.js';

// import { stripeInvestmentPayment } from '../controllers/paymentController.js';

// const router = express.Router();

// // User routes
// router.post('/userReg', userRegister);
// // router.post('userLogin, userLogIn');
// router.post('/UserLogin', userLogIn);

// router.get('/userStats',getUserStats)
// router.get("/users", getusers);
// router.get("/user/:id", getuserDetail);
// router.delete("/users/:id", deleteusers);
// router.delete("/user/:id", deleteuser);

// // Project routes
// router.post('/addProj', addProject);
// router.patch('/updateProj/:id', updateProject);
// router.delete('/deleteProj/:id', deleteProject);
// router.get("/projects", getProjects);

// // Donation routes
// router.post('/addDonation', addDonation);
// router.post('/stripe-webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);
// router.post('/payment', stripeInvestmentPayment);
// router.get('/donations', getDonations);

// // Request routes
// router.post('/addRequest', addRequest);
// router.get('/requests', getRequests);
// router.patch('/updateReq/:id', updateReq);



// // Account routes
// router.get('/currentaccount', getCurrentAccount);

// export default router;
