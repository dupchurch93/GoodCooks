const csrf = require('csurf');
const { check } = require('express-validator');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const csrfProtection = csrf({ cookie: true });
const db = require('./db/models/');

const checkUser = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
}

const userValidator = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username.')
    .isLength({ max: 50 })
    .withMessage('Username cannot be longer than 50 characters.')
    .custom((value) => {
      return db.User.findOne({
        where: { username: value },
      }).then((user) => {
        if (user) {
          return Promise.reject('Username already exists.');
        }
      });
    }),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an email.')
    .isLength({ max: 255 })
    .withMessage('Email cannot be longer than 255 characters.')
    .custom((value) => {
      return db.User.findOne({
        where: { email: value },
      }).then((email) => {
        if (email) {
          return Promise.reject('Email already exists.');
        }
      });
    }),

  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
    .isLength({ max: 50 })
    .withMessage('Password cannot be longer than 50 characters.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password.');
      }
      return true;
    }),
];

const loginValidator = [
  check('email')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a valid email'),
  check('password')
  .exists({checkFalsy:true})
  .withMessage('Please provide a valid password')
]

module.exports = { asyncHandler, csrfProtection, userValidator, loginValidator, checkUser};
