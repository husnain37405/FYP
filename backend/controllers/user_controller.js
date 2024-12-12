import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import { imageUploading } from '../utils/utils.js';

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


export const getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    next(error);
  }
};

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

export const updateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.payload?._id) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    const userId = decoded.payload._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

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
        const uploadedImageUrl = await imageUploading({
          image: avatar,
          folder: 'users',
        });
        user.avatar = { secure_url: uploadedImageUrl };
      } catch (error) {
        return res.status(500).json({ message: 'Failed to upload avatar.' });
      }
    }

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
