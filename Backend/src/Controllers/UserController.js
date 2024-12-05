import UserModel from '../Models/UserModel.js';
import { validationResult } from 'express-validator';
import BlacklistToken from './../Models/BlacklistTokenModel.js';

export const registerUser = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check required fields
  if (!firstname || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: 'User already exists', success: false });
    }

    // Hash password
    const hashPassword = await UserModel.hashPassword(password);

    // Create user
    const user = new UserModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashPassword,
    });

    // Generate token
    const token = await user.generateAuthToken();

    // Save user to database
    await user.save();

    res.status(201).json({
      msg: 'User registered successfully',
      success: true,
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: 'Error occurred while registering user',
      error: error.message,
      success: false,
    });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ msg: 'Please enter email' });
  }
  try {
    const existingUser = await UserModel.findOne({ email }).select('+password');

    if (!existingUser) {
      return res
        .status(401)
        .json({ msg: 'Invalid credentials - user not found' });
    }
    const isMatch = await UserModel.comparePassword(
      password,
      existingUser.password,
    );

    if (!isMatch) {
      return res
        .status(401)
        .json({ msg: 'Invalid credentials - wrong password' });
    }

    const token = existingUser.generateAuthToken();

    res.cookie('token', token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });

    res.status(200).json({
      token,
      msg: 'User logged in successfully',
      success: true,
      existingUser,
    });
  } catch (error) {}
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const userProfile = await UserModel.findById(user._id).select('-password');
    if (!userProfile) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({
      userProfile,
      success: true,
      msg: 'User profile retrieved successfully',
    });
  } catch (error) {}
};

export const logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookie.token || req.headers.authorization?.split(' ')[1];

  await blacklistToken.crate({ token });
  res.status(200).json({
    msg: 'User logged out successfully',
    success: true,
  });
};
