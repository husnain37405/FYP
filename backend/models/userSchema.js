// import mongoose from "mongoose"

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required:[true, 'Name is required'],
//         trim: true,
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true, 
//         match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
//     },
//     contact: {
//         type: Number,
//         required: true,
//         match: [/^\d{10,15}$/, 'Invalid contact number'],
//     },
//     roles: {
//         type: [String],
//         required: true,
//         enum: ['Donor', 'Requester', 'Admin'],
//         default: [], 
//     },    
//     password: {
//         type: String,
//         required:[true, 'Please provide the password'],
//     },
//     avatar:{secure_url:String, public_id:String},
 
// },
// {
//     timestamps: true,
// }
// );
// userSchema.index({ email: 1 });
// const User = mongoose.model('User', userSchema);
// export default User


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    contact: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Invalid contact number"],
    },
    roles: {
      type: [String],
      required: true,
      enum: ["Donor", "Requester", "Admin"],
      default: [], // Default role couldd be Requester or Donor but I keep it empty
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      secure_url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

// Index for faster email lookups
userSchema.index({ email: 1 });

export default mongoose.model("User", userSchema);
