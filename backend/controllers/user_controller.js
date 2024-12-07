// import dotenv from 'dotenv';
// dotenv.config()
// import bcrypt from "bcrypt"
// import User from "../models/userSchema.js"
// import jwt from "jsonwebtoken"

// const userRegister = async (req, res) => {
//     try {
//       const { name, email, contact, password, role } = req.body;
  
//       if (!role) {
//         return res.status(400).json({ message: "Role is required." });
//       }
  
//       const validRoles = ['Donor', 'Requester', 'Admin'];
//       if (!validRoles.includes(role)) {
//         return res.status(400).json({ message: "Invalid role provided." });
//       }
  
//       const salt = await bcrypt.genSalt(10);
//       const hashedPass = await bcrypt.hash(password, salt);
  
//       const existingUser = await User.findOne({ email });
//       console.log("Existing user:", existingUser);
  
//       if (existingUser) {
//         if (!Array.isArray(existingUser.roles)) {
//           console.error("Roles field is not an array, fixing it.");
//           existingUser.roles = [];
//         }
  
//         if (existingUser.roles.includes(role)) {
//           return res.status(400).json({ message: `You are already registered as a ${role}.` });
//         }
  
//         existingUser.roles.push(role);
//         await existingUser.save();
//         console.log(`Role ${role} added to user ${existingUser.email}`);
//         return res.status(200).json({ message: `Role ${role} added to your account.` });
//       }
  
//       const newUser = new User({
//         name,
//         email,
//         contact,
//         password: hashedPass,
//         roles: [role],
//       });
  
//       const savedUser = await newUser.save();
//       console.log("New user created:", savedUser);
//       res.status(201).json({ message: "User registered successfully!", user: savedUser });
//     } catch (err) {
//       console.error("Error in userRegister:", err);
//       res.status(500).json({ message: "An error occurred during registration.", error: err });
//     }
//   };
  

// const userLogIn = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ status: false, message: "User not found" });
//         }

//         const validated = await bcrypt.compare(password, user.password);
//         console.log('Password comparison result:', validated);

//         if (!validated) {
//             return res.status(401).json({ status: false, message: "Invalid password" });
//         }

//         if (!user.roles.includes(role)) {
//             return res.status(403).json({ status: false, message: "Role mismatch" });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24d' });

//         res.json({
//             status: true,
//             token: token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 roles: user.roles, 
//             },
//         });
//     } catch (err) {
//         console.error("Error in userLogIn:", err);
//         res.status(500).json({ status: false, error: err });
//     }
// };

// const getusers = async (req, res) => {
//     try {
//         const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        
//         if (!token) {
//             return res.status(403).send( 'ACCESS DEINED, No token provided' );
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET); 
//         if (!decoded) {
//             return res.status(401).json({ message: 'Invalid or expired token' });
//         }


//         if (decoded.role !== 'admin') {
//             return res.status(403).json({ message: 'Access denied. Admins only.' });
//         }

//         const users = await User.find().select('-password');
        
//         if (users.length === 0) {
//             return res.status(404).json({ message: 'No users found' });
//         }

//         // Return users data if role is admin
//         res.status(200).json(users);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error', error: err });
//     }
// };
// const getUserStats = async (req, res) => {
//     try {
//         const userCount = await User.countDocuments();

//         res.status(200).json({ totalUsers: userCount });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error', error: err });
//     }
// };

// const getuserDetail = async (req, res) => {
//     try {
//       const token = req.headers.authorization?.split(" ")[1]; 
//       if (!token) return res.status(401).send("Access denied. No token provided.");
  
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const userId = decoded.id;
  
//       const user = await User.findById(userId); 
//       if (!user) return res.status(404).send("User not found.");
  
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };

// const deleteuser = async (req, res) => {
//     try {
//         const result = await User.findByIdAndDelete(req.params.id);
//         if (!result) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: 'User deleted successfully', user: result });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error', error: err });
//     }
// };

// const deleteusers = async (req, res) => {
//     try {
//         const result = await User.deleteMany({ school: req.params.id }); // Adjust field based on your schema
//         if (result.deletedCount === 0) {
//             return res.status(404).json({ message: 'No users found to delete' });
//         }
//         res.status(200).json({ message: 'Users deleted successfully', result });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error', error: err });
//     }
// };

// export {
//     userRegister,
//     userLogIn,
//     getusers,
//     getUserStats,
//     getuserDetail,
//     deleteuser,
//     deleteusers
// };

// import dotenv from 'dotenv';
// dotenv.config();
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/userSchema.js";

// const COOKIE_OPTIONS = {
//   httpOnly: true, // Prevent client-side access
//   secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
//   sameSite: 'strict', // CSRF protection
//   maxAge: 24 * 60 * 60 * 1000, // 1 day
// };

// const userRegister = async (req, res) => {
//   try {
//     const { name, email, contact, password, role } = req.body;

//     if (!role) {
//       return res.status(400).json({ message: "Role is required." });
//     }

//     const validRoles = ['Donor', 'Requester', 'Admin'];
//     if (!validRoles.includes(role)) {
//       return res.status(400).json({ message: "Invalid role provided." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(password, salt);

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       if (!Array.isArray(existingUser.roles)) {
//         existingUser.roles = [];
//       }

//       if (existingUser.roles.includes(role)) {
//         return res.status(400).json({ message: `You are already registered as a ${role}.` });
//       }

//       existingUser.roles.push(role);
//       await existingUser.save();
//       return res.status(200).json({ message: `Role ${role} added to your account.` });
//     }

//     const newUser = new User({
//       name,
//       email,
//       contact,
//       password: hashedPass,
//       roles: [role],
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json({ message: "User registered successfully!", user: savedUser });
//   } catch (err) {
//     res.status(500).json({ message: "An error occurred during registration.", error: err });
//   }
// };

// const userLogIn = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ status: false, message: "User not found" });
//     }

//     const validated = await bcrypt.compare(password, user.password);
//     if (!validated) {
//       return res.status(401).json({ status: false, message: "Invalid password" });
//     }

//     if (!user.roles.includes(role)) {
//       return res.status(403).json({ status: false, message: "Role mismatch" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res
//       .cookie('token', token, COOKIE_OPTIONS)
//       .status(200)
//       .json({
//         status: true,
//         message: 'Login successful',
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           roles: user.roles,
//         },
//       });
//   } catch (err) {
//     res.status(500).json({ status: false, error: err });
//   }
// };

// const userLogOut = async (req, res) => {
//   res
//     .clearCookie('token', COOKIE_OPTIONS)
//     .status(200)
//     .json({ message: 'Logged out successfully' });
// };

// const getusers = async (req, res) => {
//   try {
//     const token = req.cookies.token; // Get token from cookies
//     if (!token) {
//       return res.status(403).json({ message: 'ACCESS DENIED, No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded) {
//       return res.status(401).json({ message: 'Invalid or expired token' });
//     }

//     const users = await User.find().select('-password');
//     if (users.length === 0) {
//       return res.status(404).json({ message: 'No users found' });
//     }

//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// };

// const getUserStats = async (req, res) => {
//   try {
//     const userCount = await User.countDocuments();
//     res.status(200).json({ totalUsers: userCount });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// };

// const getuserDetail = async (req, res) => {
//   try {
//     const token = req.cookies.token; // Get token from cookies
//     if (!token) {
//       return res.status(401).send("Access denied. No token provided.");
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) {
//       return res.status(404).send("User not found.");
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// };

// const deleteuser = async (req, res) => {
//   try {
//     const result = await User.findByIdAndDelete(req.params.id);
//     if (!result) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ message: 'User deleted successfully', user: result });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// };

// const deleteusers = async (req, res) => {
//   try {
//     const result = await User.deleteMany({ school: req.params.id });
//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: 'No users found to delete' });
//     }
//     res.status(200).json({ message: 'Users deleted successfully', result });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// };

// export {
//   userRegister,
//   userLogIn,
//   userLogOut,
//   getusers,
//   getUserStats,
//   getuserDetail,
//   deleteuser,
//   deleteusers,
// };

// import dotenv from 'dotenv';
// dotenv.config();
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/userSchema.js';

// Cookie configuration for security
// const COOKIE_OPTIONS = {
//   httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
//   secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
//   sameSite: 'strict', // CSRF protection
//   maxAge: 24 * 60 * 60 * 1000, // 1 day
// };

// // ** Register New User **
// export const registerNewUser = async (req, res, next) => {
//   try {
//     const { name, email, contact, password, role } = req.body;

//     // Role validation
//     const validRoles = ['Donor', 'Requester', 'Admin'];
//     if (!role || !validRoles.includes(role)) {
//       return res.status(400).json({ message: 'Invalid or missing role.' });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       if (existingUser.roles.includes(role)) {
//         return res.status(400).json({ message: `Already registered as ${role}.` });
//       }

//       // Add new role if user exists
//       existingUser.roles.push(role);
//       await existingUser.save();
//       return res.status(200).json({ message: `Role ${role} added to your account.` });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       name,
//       email,
//       contact,
//       password: hashedPassword,
//       roles: [role],
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json({ message: 'User registered successfully!', user: savedUser });
//   } catch (error) {
//     next(error);
//   }
// };

// // ** Login User **
// export const loginUser = async (req, res, next) => {
//   try {
//     const { email, password, role } = req.body;

//     // Validate email and password
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Validate password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid password.' });
//     }

//     // Validate role
//     if (!user.roles.includes(role)) {
//       return res.status(403).json({ message: `Access denied for role: ${role}` });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     // Send token in HttpOnly cookie
//     res.cookie('token', token, COOKIE_OPTIONS).status(200).json({
//       message: 'Login successful.',
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         roles: user.roles,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ** Logout User **
// export const logoutUser = (req, res, next) => {
//   try {
//     res.clearCookie('token', COOKIE_OPTIONS).status(200).json({
//       message: 'Logged out successfully.',
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// ** Get All Users **
// export const getUsers = async (req, res, next) => {
//   try {
//     const users = await User.find().select('-password');
//     if (!users.length) {
//       return res.status(404).json({ message: 'No users found.' });
//     }
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// };

// ** Get User Stats **
// export const getUserStats = async (req, res, next) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     res.status(200).json({ totalUsers });
//   } catch (error) {
//     next(error);
//   }
// };

// ** Get User Details by Token **
// export const getUserDetails = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// ** Delete Single User **
// export const deleteUser = async (req, res, next) => {
//   try {
//     const result = await User.findByIdAndDelete(req.params.id);
//     if (!result) {
//       return res.status(404).json({ message: 'User not found.' });
//     }
//     res.status(200).json({ message: 'User deleted successfully.', user: result });
//   } catch (error) {
//     next(error);
//   }
// };

// ** Delete Users by Condition **
// export const deleteUsers = async (req, res, next) => {
//   try {
//     const result = await User.deleteMany({ school: req.params.id }); // Adjust condition as needed
//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: 'No users found to delete.' });
//     }
//     res.status(200).json({ message: 'Users deleted successfully.', result });
//   } catch (error) {
//     next(error);
//   }
// };

// import User from '../models/userSchema.js';
// import jwt from 'jsonwebtoken';

// // ** Get All Users **
// export const getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find().select('-password');
//     if (!users.length) {
//       return res.status(404).json({ message: 'No users found.' });
//     }
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// };

// // ** Get User Stats **
// export const getUserStats = async (req, res, next) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     res.status(200).json({ totalUsers });
//   } catch (error) {
//     next(error);
//   }
// };

// // ** Get User Details by Token **
// export const getUserDetails = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// // ** Delete Single User **
// export const deleteUserById = async (req, res, next) => {
//   try {
//     const result = await User.findByIdAndDelete(req.params.id);
//     if (!result) {
//       return res.status(404).json({ message: 'User not found.' });
//     }
//     res.status(200).json({ message: 'User deleted successfully.', user: result });
//   } catch (error) {
//     next(error);
//   }
// };

// // ** Delete Users by Condition **
// export const deleteMultipleUsers = async (req, res, next) => {
//   try {
//     const result = await User.deleteMany({ school: req.params.id }); 
//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: 'No users found to delete.' });
//     }
//     res.status(200).json({ message: 'Users deleted successfully.', result });
//   } catch (error) {
//     next(error);
//   }
// };


import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import { imageUploading } from '../utils/utils.js';

// ** Get All Users **
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    if (!users.length) {
      return res.status(404).json({ message: 'No users found.' });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// ** Get User Stats **
export const getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    next(error);
  }
};

// ** Get User Details by Token **
// export const getUserDetails = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;
  
//     if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded?.payload?._id) {
//       return res.status(400).json({ message: 'Invalid token.' });
//     }

//     const user = await User.findById(decoded.payload._id).select('-password');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// };
export const getUserDetails = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.payload?._id) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    const user = await User.findById(decoded.payload._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // if (user.avatar?.secure_url) {
    //   user.avatar.secure_url = `${req.protocol}://${req.get('host')}/static/uploads/users/${user.avatar.secure_url.split('/').pop()}`;
    // }

    if (user.avatar?.secure_url) {
      user.avatar.secure_url = `${req.protocol}://${req.get('host')}/static/uploads/users/${user.avatar.secure_url.split('/').pop()}`;
    } else {
      user.avatar = { secure_url: `${req.protocol}://${req.get('host')}/static/uploads/users/default.png` }; // Default avatar
    }
    

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ** Delete Single User **
export const deleteUserById = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User deleted successfully.', user: result });
  } catch (error) {
    next(error);
  }
};

// ** Delete Users by Condition **
export const deleteMultipleUsers = async (req, res, next) => {
  try {
    const result = await User.deleteMany({ school: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No users found to delete.' });
    }
    res.status(200).json({ message: 'Users deleted successfully.', result });
  } catch (error) {
    next(error);
  }
};

// export const updateUser = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;

//     // Check for token
//     if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     // Decode the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded?.payload?._id) {
//       return res.status(400).json({ message: 'Invalid token.' });
//     }

//     const userId = decoded.payload._id;

//     // Fetch the user from the database
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Update user details, excluding email, password, and roles
//     const { name, contact, avatar } = req.body;

//     if (name) {
//       if (typeof name !== 'string' || !name.trim()) {
//         return res.status(400).json({ message: 'Invalid name.' });
//       }
//       user.name = name;
//     }

//     if (contact) {
//       if (!/^\d{10,15}$/.test(contact)) {
//         return res.status(400).json({ message: 'Invalid contact number.' });
//       }
//       user.contact = contact;
//     }

//     if (avatar) {
//       if (typeof avatar !== 'object' || !avatar.secure_url || !avatar.public_id) {
//         return res.status(400).json({ message: 'Invalid avatar data.' });
//       }
//       user.avatar = {
//         secure_url: avatar.secure_url,
//         public_id: avatar.public_id,
//       };
//     }

//     // Save the updated user details
//     const updatedUser = await user.save();

//     res.status(200).json({
//       message: 'User updated successfully.',
//       user: updatedUser,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// export const updateUser = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;

//     // Check for token
//     if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     // Decode the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded?.payload?._id) {
//       return res.status(400).json({ message: 'Invalid token.' });
//     }

//     const userId = decoded.payload._id;

//     // Fetch the user from the database
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Update user details, excluding email, password, and roles
//     const { name, contact, avatar } = req.body;

//     if (name) {
//       if (typeof name !== 'string' || !name.trim()) {
//         return res.status(400).json({ message: 'Invalid name.' });
//       }
//       user.name = name;
//     }

//     if (contact) {
//       if (!/^\d{10,15}$/.test(contact)) {
//         return res.status(400).json({ message: 'Invalid contact number.' });
//       }
//       user.contact = contact;
//     }

//     if (avatar) {
//       try {
//         const uploadedImageUrl = await imageUploading({
//           image: avatar,
//           folder: 'users',
//         });
//         user.avatar = { secure_url: uploadedImageUrl };
//       } catch (error) {
//         return res.status(500).json({ message: 'Failed to upload avatar.' });
//       }
//     }

//     // Save the updated user details
//     const updatedUser = await user.save();

//     res.status(200).json({
//       message: 'User updated successfully.',
//       user: {
//         name: updatedUser.name,
//         email: updatedUser.email,
//         contact: updatedUser.contact,
//         avatar: updatedUser.avatar?.secure_url,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// export const updateUser = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;

//     // Check for token
//     if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     // Decode the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded?.payload?._id) {
//       return res.status(400).json({ message: 'Invalid token.' });
//     }

//     const userId = decoded.payload._id;

//     // Fetch the user from the database
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Update user details, excluding email, password, and roles
//     const { name, contact, avatar } = req.body;

//     if (name) {
//       if (typeof name !== 'string' || !name.trim()) {
//         return res.status(400).json({ message: 'Invalid name.' });
//       }
//       user.name = name;
//     }

//     if (contact) {
//       if (!/^\d{10,15}$/.test(contact)) {
//         return res.status(400).json({ message: 'Invalid contact number.' });
//       }
//       user.contact = contact;
//     }

//     if (avatar) {
//       try {
//         // Assuming avatar is base64-encoded image data
//         const base64Data = avatar.split(';base64,')[1];  // Remove base64 prefix
//         const fileType = avatar.split(';base64,')[0].split('/')[1];  // Extract file type (jpeg, png, etc.)

//         if (!['jpeg', 'jpg', 'png'].includes(fileType)) {
//           return res.status(400).json({ message: 'Invalid image type. Please upload jpg, jpeg, or png.' });
//         }

//         // Create a unique file name based on timestamp
//         const fileName = `${new Date().getTime()}.` + fileType;
//         const imagePath = path.join(__dirname, './public/uploads/users/', fileName);  // Folder where images are saved
//         const filePath = path.resolve(imagePath);

//         // Save the image to the file system
//         fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });

//         // Update avatar path in the user model
//         user.avatar = { secure_url: `/static/uploads/users/${fileName}` };

//       } catch (error) {
//         return res.status(500).json({ message: 'Failed to upload avatar.' });
//       }
//     }

//     // Save the updated user details
//     const updatedUser = await user.save();

//     res.status(200).json({
//       message: 'User updated successfully.',
//       user: {
//         name: updatedUser.name,
//         email: updatedUser.email,
//         contact: updatedUser.contact,
//         avatar: updatedUser.avatar?.secure_url,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const updateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    // Check for token
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.payload?._id) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    const userId = decoded.payload._id;

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user details, excluding email, password, and roles
    const { name, contact, avatar } = req.body;

    if (name) {
      if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ message: 'Invalid name.' });
      }
      user.name = name;
    }

    if (contact) {
      if (!/^\d{10,15}$/.test(contact)) {
        return res.status(400).json({ message: 'Invalid contact number.' });
      }
      user.contact = contact;
    }

    if (avatar) {
      try {
        // Upload the avatar image
        const uploadedImageUrl = await imageUploading({
          image: avatar,
          folder: 'users',
        });
        user.avatar = { secure_url: uploadedImageUrl };
      } catch (error) {
        return res.status(500).json({ message: 'Failed to upload avatar.' });
      }
    }

    // Save the updated user details
    const updatedUser = await user.save();

    res.status(200).json({
      message: 'User updated successfully.',
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        contact: updatedUser.contact,
        avatar: updatedUser.avatar?.secure_url,
      },
    });
  } catch (error) {
    next(error);
  }
};
