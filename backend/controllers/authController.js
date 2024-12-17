import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

dotenv.config();


export const registerNewUser = async (req, res, next) => {
  try {
    // const { name, email, contact, roles, password, avatar } = req.body;
    // if (!roles || roles.length === 0) {
    //   return res.status(400).json({ message: "Invalid or missing role." });
    // }

    const { name, email, contact, password, role } = req.body;
    const validRoles = ['Donor', 'Requester', 'Admin'];
    if (!role || !validRoles.includes(role)) {
      return next(new Error('Invalid or missing role.'));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.roles.includes(role)) {
        return next(new Error(`Already registered as ${role}.`));
      }

      
      existingUser.roles.push(role);
      await existingUser.save();
      return res.status(200).json({ message: `Role ${role} added to your account.` });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      name,
      email,
      contact,
      password: hashedPassword,
      roles: [role],
    });

    // const newUser = await User.create({
    //   name,
    //   email,
    //   contact,
    //   roles, 
    //   password : hashedPassword,
    //   avatar,
    // });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully!', user: savedUser });
  } catch (error) {
    next(error); 
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

export const logoutUser = (req, res, next)=>{
  res.cookie("token", "", { expires: new Date(Date.now())}).json({
      message:'Logged out'
  });
}




