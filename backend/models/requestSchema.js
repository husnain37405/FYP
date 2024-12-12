import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, 
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project", 
        required: true 
    }, 
    description: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        required: true, 
        enum: ["Pending", "Accepted", "Rejected"], 
        default: "Pending" 
    },
    rejectReason: { 
        type: String 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
}, { timestamps: true });

requestSchema.index({ userId: 1, projectId: 1 });

const Request = mongoose.model('Request', requestSchema)
export default Request