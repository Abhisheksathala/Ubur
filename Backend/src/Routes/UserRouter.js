import express from 'express';
import { body } from 'express-validator';
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from '../Controllers/UserController.js';
import { authUser } from './../MiddleWares/Auth.js';

const UserRouter = express.Router();

UserRouter.post(
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
  ],
  registerUser,
);

UserRouter.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
  ],
  loginUser,
);

UserRouter.get('/profile', authUser, getUserProfile);

UserRouter.get('/logout', authUser, logoutUser);

export default UserRouter;
