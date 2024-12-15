import captainModel from '../Models/CaptainModel.js';
import { validationResult } from 'express-validator';
import BlacklistToken from './../Models/BlacklistTokenModel.js';

export const registerCaptain = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  // Extracting the fullname and vehicle fields
  const { firstname, lastname } = fullname || {};
  const { color, plate, capacity, vehicleType } = vehicle || {};

  // Check if required fields are provided
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({
        msg: 'Email already exists',
        success: false,
        message: 'Email already exists',
      });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    // Create new captain
    const newCaptain = new captainModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });

    const token = await newCaptain.generateAuthToken();

    await newCaptain.save();

    res.status(201).json({
      msg: 'Captain registered successfully',
      success: true,
      token,
      newCaptain,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error', success: false });
  }
};

export const LoginCaptain = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
      return res
        .status(401)
        .json({ msg: 'Invalid credentials - user not found' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ msg: 'Invalid credentials - wrong password' });
    }
    const token = captain.generateAuthToken();

    res.status(200).json({
      msg: 'Captain logged in successfully',
      token,
      captain,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error', success: false });
  }
};

export const getCaptainProfile = async (req, res) => {
  try {
    const captain = await captainModel
      .findById(req.captain._id)
      .select('-password');
    res.status(200).json({ captain });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: 'Server error captainprofile', success: false });
  }
};

export const LogOutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token provided. Access denied.' });
  }

  try {
    await BlacklistToken.create({ token });
    res.clearCookie('token');
    res
      .status(200)
      .json({ msg: 'Captain logged out successfully', success: true });
  } catch (error) {
    console.log(error);
  }
};
