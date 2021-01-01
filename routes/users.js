const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('../utils');
const db = require('../db/models');

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
router.post(
  '/register',
  csrfProtection,
  asyncHandler(async (req, res) => {})
);

//login an existing user

module.exports = router;
