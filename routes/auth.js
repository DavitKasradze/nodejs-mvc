const express = require('express');
const {check, body} = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
  [
    check('email')
      .isEmail()
      .withMessage('Invalid Email!')
      .custom((value, {req}) => {
        return User.findOne({email: value})
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject(
                'User is already registered with that email address!'
              );
            }
          });
      }),
    body(
      'password',
      'Please enter a correct password!'
    )
      .isLength({min: 5})
      .isAlphanumeric()
  ],
  authController.postLogin);

router.post(
  '/signup',
  [
    check('email')
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
      }),
    body(
      'password',
      'Please enter a password with more than 5 characters and only numbers!'
    )
      .isLength({min: 5})
      .isAlphanumeric(),
    body('confirmPassword')
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
