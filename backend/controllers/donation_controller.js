import Donation from "../models/donationSchema.js"
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

const getAllDonations = async (req, res) => {
 
    try {
        let donations = await Donation.find()
            .populate('projectId', 'title') 
            .populate('userId', 'name') 
            .exec();
            console.log(" All Donations forn donatio controller: ", donations)
        if (donations.length > 0) {
            let modifiedDonations = donations.map((donation) => ({
                _id: donation._id,
                projectId: donation.projectId ? donation.projectId._id : null, 
                projectTitle: donation.projectId ? donation.projectId.title : 'No Title', 
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

 const getDonationsStats = async (req, res, next) => {
    try {
      const totalDonations = await Donation.countDocuments(); 
      res.status(200).json({ totalDonations }); 
    } catch (error) {
      next(error); 
    }
  };
  

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

const addDonation = async (req, res) => {
    try {
        const { amount, projectId } = req.body;
        const userId = req.user._id.toString(); 
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        
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
            metadata: { userId, projectId, amount: amount.toString() }, 
        });

        const donation = new Donation({
            projectId: session.metadata.projectId,
            userId: session.metadata.userId,
            amount: parseFloat(session.metadata.amount),
            transactionId: session.id,
        });

        await donation.save();
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ message: 'Error creating donation session', error: error.message });
    }
};

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


const getDonorTotalDonatedAmount = async (req, res) => {
    try {
        const donorId = req.user._id;

        const totalDonatedAmount = await Donation.aggregate([
            { $match: { userId: donorId } },
            { $group: { _id: '$userId', totalAmount: { $sum: '$amount' } } }
        ]);

        const totalAmount = totalDonatedAmount.length > 0 ? totalDonatedAmount[0].totalAmount : 0;

        res.json({ donorId, totalAmount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

export {
    addDonation,
    getAllDonations,
    handleStripeWebhook,
    getDonorDonations,
    getDonationsStats,
    getDonorTotalDonationsCount,
    getDonorTotalDonatedAmount,
};
