const express = require("express");
const router = express.Router();
const {
  asyncHandler,
  csrfProtection,
  userValidator,
  loginValidator,
} = require("../utils");
const { validationResult } = require("express-validator");
const { User, Cupboard } = require("../db/models/");
const bcrypt = require("bcryptjs");
const { loginUser, logoutUser } = require("../auth");

/* GET user registration form */
router.get("/register", csrfProtection, function (req, res, next) {
  const user = User.build();
  res.render("user-register", {
    title: "Register",
    user,
    csrfToken: req.csrfToken(),
  });
});

//add a new user
router.post(
  "/register",
  csrfProtection,
  userValidator,
  asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = User.build({ username, email, hashedPassword });
        await user.save();
        const newCupboard = await Cupboard.build({
          userId: user.id,
          name: "default",
        });
        await newCupboard.save();
        loginUser(req, res, user);
        res.redirect("/");
      } catch (err) {
        next(err);
      }
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("user-register", {
        title: "Register",
        user: {username, email, password},
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//login an existing user
router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("user-login", {
      title: "login",
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/login",
  csrfProtection,
  loginValidator,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let errors = [];

    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      const user = await User.findOne({ where: { email } });
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );
        if (passwordMatch) {
          loginUser(req, res, user);
          res.redirect("/");
        }
      }
      errors.push(
        "Login failed for the provided email address. Please try again"
      );
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render("user-login", {
      title: "Login",
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post("/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect("/");
});

router.get(
  "/login/demo",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ where: { id: 1 } });
    loginUser(req, res, user);
    res.redirect("/");
  })
);

//TO DO
// router.get('/users/:id')

module.exports = router;
