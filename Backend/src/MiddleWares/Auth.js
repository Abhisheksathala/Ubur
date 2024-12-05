import UserModel from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ msg: 'No token provided. Access denied.' });
    }

    const isBlacklisted = await UserModel.findOne({
      token: token,
    });

    if (isBlacklisted) {
      return res.status(401).json({ msg: 'Token blacklisted. Access denied.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await UserModel.findById(decoded.id); // Adjust field names if needed
    if (!user) {
      return res.status(401).json({ msg: 'User not found. Access denied.' });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authUser middleware:', error);
    res
      .status(500)
      .json({ msg: 'Internal server error in authUser middleware.' });
  }
};
