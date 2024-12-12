import Stripe from "stripe"
import "dotenv/config.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeInvestmentPayment = async (req, res) => {
    const { amount, userId, accountId, investmentType, transactionType } = req.body;

    if (!['Deposit', 'Withdrawal'].includes(transactionType)) {
        return res.status(400).json({ error: 'Invalid transaction type. Must be "deposit" or "withdrawal".' });
    }
    if (!amount || amount < 1000) {
        return res.status(400).json({ error: 'Minimum investment amount is ₩1000' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'krw',
                        product_data: {
                            name: `${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} for ${investmentType}`,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/investment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/investment-cancel`,
            metadata: { userId, accountId, investmentType, transactionType },
        });

        // Respond with the session URL for frontend redirection
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
};


export {
    stripeInvestmentPayment
};