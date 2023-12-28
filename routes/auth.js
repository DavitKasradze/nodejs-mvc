const express = require('express');
const {body} = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid Email!')
      .normalizeEmail(),
    body(
      'password',
      'Please enter a correct password!'
    )
      .isLength({min: 5})
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin);

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid Email!')
      .custom((value, {req}) => {
        //   if (value === 'test@test.com') {
        //     throw new Error('This email address is forbidden!');
        //   }
        //   return true; // აქ რა გააკეთა ვერ მივხვდი
        // }),
        return User.findOne({email: value})
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject(
                'User is already registered with that email address!'
              );
            }
          });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with more than 5 characters and only numbers!'
    )
      .isLength({min: 5})
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, {req}) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match!')
        }
        return true;
      })
  ],
  authController.postSignup
)
;

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
