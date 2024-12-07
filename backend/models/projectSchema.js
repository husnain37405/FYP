// import mongoose from 'mongoose';
// const projectSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         // required: true
//         required: [true, 'Title is required'],
//         maxlength: [150, 'Title cannot be more than 150 characters'],
//         trim: true
//     },
//     description: {
//         type: String,
//         required: [true, 'Description is required'],
//     },
//     status: {
//         type: String,
//         required: true,
//         // enum: ['Ongoing', 'Completed']
//         enum:  ['Ongoing', 'Completed', 'Pending', 'Cancelled'],

//     },
// }
// ,{
//     timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
// }
// );
 
// const Project = mongoose.model('Project', projectSchema)
// export default Project

import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Title is required"], 
        trim: true 
    },
    description: { 
        type: String, 
        required: [true, "Description is required"] 
    },
    status: { 
        type: String, 
        required: true, 
        enum: ["Active", "Completed",] 
    },
    isDefault: {
        type: Boolean,
        default: false,
      },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema)
export default Project