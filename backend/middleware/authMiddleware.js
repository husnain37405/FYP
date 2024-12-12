import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.payload._id).select('name email roles'); 
    if (!req.user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    next();
  } catch (error) {
   
    next(error);
   
  }
};

export const authorizedUser = (...allowedRoles) => {
  try {
    return (req, res, next) => {
      if (!req.user || !req.user.roles || !req.user.roles.some((role) => allowedRoles.includes(role))) {
        return next(new Error(`Role ${req.user?.roles?.join(', ') || 'undefined'} is not allowed to access this resource.`));
      }
      next()
    };
  } catch (error) {
   
    next(error);
  }
};


