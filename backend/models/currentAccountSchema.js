import mongoose from "mongoose";

const currentAccountSchema = new mongoose.Schema(
  {
    totalDonatedAmount: {
      type: Number,
      required: true,
      default: 0, 
    },
    totalPaidAmount: {
      type: Number,
      required: true,
      default: 0, 
    },
    lastUpdated: {
      type: Date,
      default: Date.now, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("CurrentAccount", currentAccountSchema);
