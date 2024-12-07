// import mongoose from "mongoose";
// const currentaccountSchema = new mongoose.Schema({
//     totalDonatedAmount: {
//         type: Number,  // Change String to Number
//         required: true,
//         default: 0  // Set default value to 0
//     },
//     totalPaidAmount: {
//         type: Number,  // Change String to Number
//         required: true,
//         default: 0  // Set default value to 0
//     }, 
// });

// const CurrentAccount = mongoose.model('CurrentAccount', currentaccountSchema)
// export default CurrentAccount


import mongoose from "mongoose";

const currentAccountSchema = new mongoose.Schema(
  {
    totalDonatedAmount: {
      type: Number,
      required: true,
      default: 0, // Initial value is 0
    },
    totalPaidAmount: {
      type: Number,
      required: true,
      default: 0, // Initial value is 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now, // Automatically updates with each change
    },
  },
  { timestamps: true }
);

export default mongoose.model("CurrentAccount", currentAccountSchema);
