import captainModel from '../Models/CaptainModel.js';
import { validationResult } from 'express-validator';

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

    const hashPassword = await captainModel.hashPassword(password);

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
