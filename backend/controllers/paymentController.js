// const Stripe = require('stripe');
// const express = require('express');
import Stripe from "stripe"
import express from "express"
import "dotenv/config.js";
import fs from "fs"
// import dotenv from 'dotenv';
// dotenv.config()
// require('dotenv/config');
// const fs = require('fs');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const stripeInvestmentPayment = async (req, res) => {
    const { amount, userId, accountId, investmentType, transactionType } = req.body;

    // Validate transaction type and amount
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
            success_url: `http://localhost:3000/investment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/investment-cancel`,
            metadata: { userId, accountId, investmentType, transactionType },
        });

        // Respond with the session URL for frontend redirection
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
};

// module.exports = {
//     stripeInvestmentPayment
//   };
export {
    stripeInvestmentPayment
  };