import CurrentAccount from "../models/currentAccountSchema.js"
const getCurrentAccount = async (req, res) => {
    try {
        const account = await CurrentAccount.findOne();

        if (!account) {
            return res.status(404).json({ message: "Current account not found" });
        }

        res.json({
            totalDonatedAmount: account.totalDonatedAmount,
            totalPaidAmount: account.totalPaidAmount,
        });
    } catch (err) {

        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

export {
    getCurrentAccount
};