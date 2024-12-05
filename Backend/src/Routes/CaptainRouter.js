import express from 'express';
import { body } from 'express-validator';
import { registerCaptain } from '../Controllers/CaptainController.js';

const captainRouter = express.Router();

captainRouter.post('/register', [
  body('fullname').isString().withMessage('Name must be a string'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  body('vehicle.color').isString().withMessage('Color must be a string'),
  body('vehicle.plate').isString().withMessage('Plate must be a string'),
  body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
  body('vehicle.vehicleType')
    .isString()
    .withMessage('Vehicle type must be a string'),
]);

export default captainRouter;
