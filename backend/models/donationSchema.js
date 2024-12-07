// import mongoose from 'mongoose';
// const donationSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',  // Ensure this matches the name of your user mode
//     },
//     projectId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Project',  // Ensure this matches the name of your project model
//         required: true
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     transactionId: {
//         type: String,
//         required: false,
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
// });

// const Donation = mongoose.model('Donation', donationSchema);
// export default Donation;
import mongoose from 'mongoose';
const donationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: [true, 'User ID is required'],
    }, // Links each donation to a specific user
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project", 
        required: true 
    }, // Links each donation to a specific project
    amount: { 
        type: Number, 
        required: true 
    },
    transactionId: { 
        type: String 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
}, { timestamps: true });

donationSchema.index({ userId: 1, projectId: 1 });

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;