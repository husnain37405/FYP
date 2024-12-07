// // const Donation = require('../modules/donationSchema');  // Ensure correct path
// // const CurrentAccount = require('../modules/currentAccountSchema');  // Ensure correct path
// // const Project = require('../modules/projectSchema');  // Ensure correct path
// // const Stripe = require('stripe');

// import Donation from '../modules/donationSchema.js'
// import CurrentAccount from "../modules/currentAccountSchema"
// import Project from "../modules/projectSchema"
// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your secret key
// const getDonations = async (req, res) => {
//     try {
//         // Fetch all donations from the database and populate the projectId field
//         let donations = await Donation.find()
//             .populate('projectId', 'title') // Populate projectId field with title from Project model
//             .populate('userId', 'name') // Populate projectId field with title from Project model
//             .exec();

//         // Check if any donations are found
//         if (donations.length > 0) {
            
//             let modifiedDonations = donations.map((donation) => {
//                 return {
//                     _id: donation._id,
//                     projectId: donation.projectId._id, // Project ID
//                     projectTitle: donation.projectId.title, // Project title
//                     userId: donation.userId._id,
//                     userName: donation.userId.name,
//                     amount: donation.amount,
//                     transactionId: donation.transactionId,
//                     date: donation.date
//                 };
//             });

//             // Send the modified list of donations
//             res.json(modifiedDonations);
//         } else {
//             // No donations found
//             res.status(404).json({ message: "No donations found" });
//         }
//     } catch (err) {
//         // Handle errors
//         console.log(err)
//         res.status(500).json({ message: 'Server Error', error: err.message });

//     }
// };

// const handleStripeWebhook = async (req, res) => {
//     const sig = req.headers['stripe-signature'];
//     const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
//     try {
//       const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  
//       if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;
  
//         const donation = new Donation({
//           projectId: session.metadata.projectId,
//           userId: session.metadata.userId,
//           amount: session.metadata.amount,
//           transactionId: session.id,
//         });
  
//         await donation.save();
//         console.log('Donation recorded:', donation);
//       }
  
//       res.status(200).json({ received: true });
//     } catch (error) {
//       console.error('Webhook error:', error.message);
//       res.status(400).send(`Webhook Error: ${error.message}`);
//     }
//   };
  

//   const addDonation = async (req, res) => {
//     try {
//       const { amount, projectId, userId } = req.body;
  
//       // Create Stripe Checkout session
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             price_data: {
//               currency: 'usd',
//               product_data: { name: 'Donation' },
//               unit_amount: amount * 100, // Stripe uses smallest currency unit (cents)
//             },
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: `http://localhost:5173/donations?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: 'http://localhost:5173/donations',
//         metadata: { userId, projectId, amount },
//       });
  
//       // Send the session ID to the frontend
//       const donation = new Donation({
//         projectId: session.metadata.projectId,
//         userId: session.metadata.userId,
//         amount: session.metadata.amount,
//         transactionId: session.id,
//       });

//       await donation.save();
//       console.log('Donation recorded:', donation);
//       res.json({ sessionId: session.id });
//     } catch (error) {
//       console.error('Error creating Stripe session:', error);
//       res.status(500).json({ message: 'Error creating donation session', error: error.message });
//     }
//   };
  




// // module.exports = {
// //     addDonation,
// //     getDonations,
// //     handleStripeWebhook
// // };
// export {
//   addDonation,
//   getDonations,
//   handleStripeWebhook
// };


import Donation from "../models/donationSchema.js"
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your secret key

// Fetch all donations and populate fields
const getAllDonations = async (req, res) => {
 
    try {
        let donations = await Donation.find()
            .populate('projectId', 'title') // Populate projectId field with title from Project model
            .populate('userId', 'name') // Populate userId field with name from User model
            .exec();
            console.log(" All Donations forn donatio controller: ", donations)
        if (donations.length > 0) {
            // let modifiedDonations = donations.map((donation) => ({
            //     _id: donation._id,
            //     projectId: donation.projectId._id, // Project ID
            //     projectTitle: donation.projectId.title, // Project title
            //     userId: donation.userId._id,
            //     userName: donation.userId.name,
            //     amount: donation.amount,
            //     transactionId: donation.transactionId,
            //     date: donation.date
            // }));
            
            let modifiedDonations = donations.map((donation) => ({
                _id: donation._id,
                projectId: donation.projectId ? donation.projectId._id : null, // Check for null or undefined
                projectTitle: donation.projectId ? donation.projectId.title : 'No Title', // Check for null or undefined
                userId: donation.userId ? donation.userId._id : null,
                userName: donation.userId ? donation.userId.name : 'No Name',
                amount: donation.amount,
                transactionId: donation.transactionId,
                date: donation.date
            }));
            

            res.json(modifiedDonations);
        } else {
            res.status(404).json({ message: "No donations found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
//Fetching all donations, accessible by only donor's own donations
const getDonorDonations = async (req, res) => {
    try {
        const donorId = req.user._id;
      
        const donations = await Donation.find({ userId: donorId })
            .populate('projectId', 'title') 
            .exec();

        if (donations.length > 0) {
            const donorDonations = donations.map((donation) => ({
                projectId: donation.projectId._id, 
                projectTitle: donation.projectId.title,
                amount: donation.amount,
                transactionId: donation.transactionId,
                date: donation.date,
            }));

            res.json(donorDonations);
        } else {
            res.status(404).json({ message: "No donation history found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};


// Fetch total number of donations
 const getDonationsStats = async (req, res, next) => {
    try {
      const totalDonations = await Donation.countDocuments(); 
      res.status(200).json({ totalDonations }); 
    } catch (error) {
      next(error); 
    }
  };
  

// Handle Stripe webhook events
const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
    try {
        const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
  
            const donation = new Donation({
                projectId: session.metadata.projectId,
                userId: session.metadata.userId,
                amount: session.metadata.amount,
                transactionId: session.id,
            });
  
            await donation.save();
            console.log('Donation recorded:', donation);
        }
  
        res.status(200).json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
};

// Add donation and create a Stripe checkout session
// const addDonation = async (req, res) => {
//     try {
//         const { amount, projectId, userId } = req.body;

//         // Create Stripe Checkout session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: 'usd',
//                         product_data: { name: 'Donation' },
//                         unit_amount: amount * 100, // Stripe uses smallest currency unit (cents)
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             success_url: `http://localhost:5173/donations?session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: 'http://localhost:5173/donations',
//             metadata: { userId, projectId, amount },
//         });

//         const donation = new Donation({
//             projectId: session.metadata.projectId,
//             userId: session.metadata.userId,
//             amount: session.metadata.amount,
//             transactionId: session.id,
//         });

//         await donation.save();
//         console.log('Donation recorded:', donation);
//         res.json({ sessionId: session.id });
//     } catch (error) {
//         console.error('Error creating Stripe session:', error);
//         res.status(500).json({ message: 'Error creating donation session', error: error.message });
//     }
// };
//^Working
const addDonation = async (req, res) => {
    try {
        const { amount, projectId } = req.body;

        // Get userId from authenticated session and ensure it's a string
        const userId = req.user._id.toString(); // Convert to string
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: 'Donation' },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/addDonation?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/addDonation`,
            metadata: { userId, projectId, amount: amount.toString() }, // Convert metadata values to strings
        });

        // Save donation in the database
        const donation = new Donation({
            projectId: session.metadata.projectId,
            userId: session.metadata.userId,
            amount: parseFloat(session.metadata.amount), // Convert back to number if needed
            transactionId: session.id,
        });

        await donation.save();
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ message: 'Error creating donation session', error: error.message });
    }
};
// Get the total number of donations made by a single donor
const getDonorTotalDonationsCount = async (req, res) => {
    try {
        const donorId = req.user._id;

        const totalDonationsCount = await Donation.countDocuments({ userId: donorId });

        res.json({ donorId, totalDonationsCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};


// Get the total donated amount by a single donor
const getDonorTotalDonatedAmount = async (req, res) => {
    try {
        const donorId = req.user._id;

        const totalDonatedAmount = await Donation.aggregate([
            { $match: { userId: donorId } },
            { $group: { _id: '$userId', totalAmount: { $sum: '$amount' } } }
        ]);

        // Return 0 if no donations found
        const totalAmount = totalDonatedAmount.length > 0 ? totalDonatedAmount[0].totalAmount : 0;

        res.json({ donorId, totalAmount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};



// Export functions for use in routes
export {
    addDonation,
    getAllDonations,
    handleStripeWebhook,
    getDonorDonations,
    getDonationsStats,
    getDonorTotalDonationsCount,
    getDonorTotalDonatedAmount,
};
