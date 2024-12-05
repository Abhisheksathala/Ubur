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
    body('email')
      .isEmail()
      .withMessage(
        'Please enter a valid email must be at least 5 characters long',
      ),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
    body('fullname.fistname')
      .isLength({ min: 5 })
      .withMessage('Name must be at least 5 characters long'),
  ],
  registerUser,
);

UserRouter.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage(
        'Please enter a valid email must be at least 5 characters long',
      ),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
  ],
  loginUser,
);

UserRouter.get('/profile', authUser, getUserProfile);

UserRouter.get('/logout', authUser, logoutUser);

export default UserRouter;
