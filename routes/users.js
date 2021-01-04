const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection, userValidator, loginValidator } = require('../utils');
const { validationResult } = require('express-validator');
const { User } = require('../db/models/');
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser } = require('../auth');

/* GET user registration form */
router.get('/register', csrfProtection, function (req, res, next) {
  const user = User.build();
  res.render('user-register', {
    title: 'Register',
    user,
    csrfToken: req.csrfToken(),
  });
});

//add a new user
router.post(
  '/register',
  csrfProtection,
  userValidator,
  asyncHandler(async (req, res) => {
    console.log('req.body', req.body);
    const { username, email, password } = req.body;
    const user = User.build({ username, email });

    const validatorErrors = validationResult(req);
    console.log('ERROR!!!!', validatorErrors);
    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('user-register', {
        title: 'Register',
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//login an existing user
router.get(
  '/login',
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render('user-login', {
      title: 'login',
      csrfToken: req.csrfToken(),
    });
    // console.log(user);
  })
);

router.post(
  '/login',
  csrfProtection,
  loginValidator,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const errors = [];

    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty) {
      const user = await User.findOne({ where: { email } });
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
        if (passwordMatch) {
          loginUser(req, res, user);
          res.redirect('/');
        }
      } else {
        errors.push('Login failed for the provided email address. Please try again');
      }
    } else {
      errors = validatorErrors.array.map((error) => error.msg);
      res.render('user-login', {
        title: 'Login',
        email,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/');
});

module.exports = router;
