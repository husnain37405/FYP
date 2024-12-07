// import mongoose from 'mongoose';
// const requestSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',  // Ensure this matches the name of your user model
//         required: true
//     },
//     projectId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Project',  // Ensure this matches the name of your project model
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         required: true,
//         enum: ['Pending', 'Accepted', 'Rejected']
//     },
//     rejectreason: {
//         type: String,
//         required: false
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
// });
 
// const Request = mongoose.model('Request', requestSchema)
// export default Request

import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, // Links each request to a specific user
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project", 
        required: true 
    }, // Links each request to a specific project
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