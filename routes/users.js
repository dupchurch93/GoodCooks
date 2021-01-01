const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection, userValidator } = require('../utils');
const { User } = require('../db/models/');
const bcrypt = require('bcryptjs');

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
    const { username, email, password } = req.body;
    const user = User.build({ username, email });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
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

module.exports = router;
