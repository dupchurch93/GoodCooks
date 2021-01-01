const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('../utils');
const db = require('../db/models');
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const userValidator = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .isLength({ max: 50 })
    .withMessage("Username cannot be longer than 50 characters")
    .custom((value) => {
      return db.User.findOne({
        where: { username: value },
      }).then((user) => {
        if (user) {
          return Promise.reject("Username already exists.");
        }
      });
    }),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email")
    .isLength({ max: 255 })
    .withMessage("Email cannot be longer than 255 characters")
    .custom((value) => {
      return db.User.findOne({
        where: { email: value },
      }).then((email) => {
        if (email) {
          return Promise.reject("Email already exists.");
        }
      });
    }),
];

/* GET user registration form */
router.get('/register', csrfProtection, function (req, res, next) {
  const user = db.User.build();
  res.render('user-register', {
    title: 'Register',
    user,
    csrfToken: req.csrfToken(),
  });
});

//add a new user
router.post('/register',csrfProtection,asyncHandler(async (req, res) => {
  const { username, emailAdress, password } = req.body

})
);

//login an existing user

module.exports = router;
