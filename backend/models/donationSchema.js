import mongoose from 'mongoose';
const donationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: [true, 'User ID is required'],
    }, 
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project", 
        required: true 
    }, 
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