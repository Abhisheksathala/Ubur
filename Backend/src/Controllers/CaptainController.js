import captainModel from '../Models/CaptainModel.js';
import { validationResult } from 'express-validator';
import BlacklistToken from './../Models/BlacklistTokenModel.js';

export const registerCaptain = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const {
    fistname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vechicleType,
  } = req.body;

  if (
    !fistname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vechicleType
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

    const hashPassword = await existingCaptain.hashPassword(password);

    const newCaptain = new captainModel({
      fistname,
      lastname,
      email,
      password,
      color,
      plate,
      capacity,
      vechicleType,
    });

    const token = await captainModel.generateAuthToken();

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

export const LoginCaptain = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    const captain = captainModel.findOne({ email });
    if (!captain) {
      return res
        .status(401)
        .json({ msg: 'Invalid credentials - user not found' });
    }
    const isMatch = captain.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ msg: 'Invalid credentials - wrong password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });
    res.status(200).json({
      msg: 'Captain logged in successfully',
      success: true,
      token,
      captain,
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
