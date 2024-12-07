// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/userSchema.js';

// dotenv.config();

// // Cookie configuration for security
// const COOKIE_OPTIONS = {
//   httpOnly: true, 
//   secure: process.env.NODE_ENV === 'production', 
//   sameSite: 'strict', 
//   maxAge: 24 * 60 * 60 * 1000, 
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


import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

dotenv.config();

// Cookie configuration for security
// const COOKIE_OPTIONS = {
//   httpOnly: true,
//   // secure: process.env.NODE_ENV === 'production',
//   secure: process.env.NODE_ENV,
//   sameSite: 'strict',
//   maxAge: 24 * 60 * 60 * 1000, // 1 day
// };
// const COOKIE_OPTIONS = {
//   httpOnly: true,
//   secure: false, // Use `true` in production
//   sameSite: 'lax', // Allows cookies to be sent in cross-origin requests
//   maxAge: 24 * 60 * 60 * 1000, // 1 day
// };


// ** Register New User **
export const registerNewUser = async (req, res, next) => {
  try {
    const { name, email, contact, password, role } = req.body;

    // Role validation
    const validRoles = ['Donor', 'Requester', 'Admin'];
    if (!role || !validRoles.includes(role)) {
      return next(new Error('Invalid or missing role.'));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.roles.includes(role)) {
        return next(new Error(`Already registered as ${role}.`));
      }

      // Add new role if user exists
      existingUser.roles.push(role);
      await existingUser.save();
      return res.status(200).json({ message: `Role ${role} added to your account.` });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      contact,
      password: hashedPassword,
      roles: [role],
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully!', user: savedUser });
  } catch (error) {
    next(error); // Pass errors to middleware
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: false, message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: `${email} is not found. Please create an account.` });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ status: false, message: 'Incorrect password. Please try again.' });
    }

    if (!user.roles.includes(role)) {
      return res.status(403).json({ status: false, message: `Unauthorized role: ${role}.` });
    }

   //
    const token = await jwt.sign({ payload: user }, process.env.JWT_SECRET, { expiresIn: "10h" });
    req.token = token;

      res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true, secure:true, SameSite: "None"
     }).status(200).json({
      status: true,
      message: 'Login successful.',
      user,
      token
  })

  } catch (error) {
    next(error); 
  }
};


// // ** Login User **
// export const loginUser = async (req, res, next) => {
//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password) {
//       return next(new Error('Email and password are required.'));
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return next(new Error('User not found.'));
//     }

//     // Validate password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return next(new Error('Invalid password.'));
//     }

//     // Validate role
//     if (!user.roles.includes(role)) {
//       return next(new Error(`Access denied for role: ${role}`));
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {id: user._id,  roles: user.roles,}, process.env.JWT_SECRET, { expiresIn: '1d' });
//     // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });


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
//     next(error); // Pass errors to middleware
//   }
// };
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';  
// import { COOKIE_OPTIONS } from '../config.js';  // If you have a separate config for cookie options

// ** Login User **
// export const loginUser = async (req, res, next) => {
//   try {
//     const { email, password, role } = req.body;
    
//     if (!email || !password) {
//       return next(new Error('Email and password are required.'));
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return next(new Error('User not found.'));
//     }

//     // Validate password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return next(new Error('Invalid password.'));
//     }

//     // Validate role: Check if the user has the required role
//     if (role && !user.roles.includes(role)) {
//       return next(new Error(`Access denied for role: ${role}`));
//     }

    // Generate JWT token with user ID and roles in payload
    // const token = jwt.sign(
    //   {
    //     id: user._id,        
    //     role: user.roles,
    //   },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1d' }
    // );

    // Send token in HttpOnly cookie
    // res.cookie('token', token, COOKIE_OPTIONS).status(200).json({
    //   message: 'Login successful.',
    //   // user: {
    //   //   id: user._id,
    //   //   name: user.name,
    //   //   email: user.email,
    //   //   roles: user.roles,
    //   // },     
    // });
  
 
//   } catch (error) {
//     next(error); // Pass errors to middleware
//   }
// };



// ** Logout User **
// export const logoutUser = (req, res, next) => {
//   try {
//     res.clearCookie('token', COOKIE_OPTIONS).status(200).json({
//       message: 'Logged out successfully.',
//     });
//   } catch (error) {
//     next(error); // Pass errors to middleware
//   }
// };

export const logoutUser = (req, res, next)=>{
  res.cookie("token", "", { expires: new Date(Date.now())}).json({
      message:'Logged out'
  });
}

// export const logoutUser = (req, res) => {
//   try {
//     res
//     .clearCookie('token', COOKIE_OPTIONS,{ httpOnly: true, secure: process.env.NODE_ENV })
//     .status(200)
//     .json({ message: 'Logged out successfully.' });
//   } catch (error) {
//     next(error);
//   }
 
// };

