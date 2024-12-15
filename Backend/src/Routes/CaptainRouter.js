import express from 'express';
import { body } from 'express-validator';
import {
  registerCaptain,
  LoginCaptain,
  getCaptainProfile,
  LogOutCaptain,
} from '../Controllers/CaptainController.js';
import { authCaptain } from '../MiddleWares/Auth.js';

const captainRouter = express.Router();

captainRouter.post(
  '/register',
  [
    body('fullname.firstname')
      .isLength({ min: 5 })
      .withMessage('First name must be at least 5 characters long'),
    body('fullname.lastname')
      .isLength({ min: 3 })
      .withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
    body('vehicle.color').isString().withMessage('Color must be a string'),
    body('vehicle.plate').isString().withMessage('Plate must be a string'),
    body('vehicle.capacity')
      .isNumeric()
      .withMessage('Capacity must be a number'),
    body('vehicle.vehicleType')
      .isString()
      .withMessage('Vehicle type must be a string'),
  ],
  registerCaptain,
);

captainRouter.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
  ],
  LoginCaptain,
);

captainRouter.get('/profile', authCaptain, getCaptainProfile);

captainRouter.post('/logout', authCaptain, LogOutCaptain);

export default captainRouter;
