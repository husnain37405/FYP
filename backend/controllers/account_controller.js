// const CurrentAccount = require('../modules/currentAccountSchema');  // Ensure correct path
import CurrentAccount from "../models/currentAccountSchema.js"
const getCurrentAccount = async (req, res) => {
    try {
        // Fetch the current account
        const account = await CurrentAccount.findOne(); // Find the single document

        // Check if the account exists
        if (!account) {
            return res.status(404).json({ message: "Current account not found" });
        }

        // Send the relevant details
        res.json({
            totalDonatedAmount: account.totalDonatedAmount,
            totalPaidAmount: account.totalPaidAmount,
        });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// module.exports = {
//     getCurrentAccount
// };
export {
    getCurrentAccount
};