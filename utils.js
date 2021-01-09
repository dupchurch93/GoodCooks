const csrf = require('csurf');
const { check } = require('express-validator');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const csrfProtection = csrf({ cookie: true });
const db = require('./db/models/');

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

const normalizeRecipes = async (recipes, resUserId = undefined) => {
  const normalized = recipes.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      author: recipe.author,
      description: recipe.description,
      link: recipe.link,
      status: (() => {
        const status = {
          saved: false,
          cooked: false,
          favorited: false,
          starRating: false,
        };
        if (resUserId) {
          for (let cupboard of recipe.Cupboards) {
            if (cupboard.userId === resUserId) {
              status.saved = true;
              if (cupboard.Cupboard_Recipe.cooked) {
                status.cooked = true;
              }
              if (cupboard.Cupboard_Recipe.favorited) {
                status.favorited = true;
              }
            }
          }
          if (recipe.Ratings.length) {
            for (let rating of recipe.Ratings) {
              if (rating.userId === resUserId) {
                status.starRating = rating.starRating;
              }
            }
          }
        }
        return status;
      })(),
      cupboards: recipe.Cupboards.map((cupboard) => {
        return {
          id: cupboard.id,
          name: cupboard.name,
        };
      }),
    };
  });
  return normalized;
};

const getSavedRecipes = async (userId) => {
  const cupboards = await db.Cupboard.findAll({
    where: {
      userId,
    },
    include: [db.Recipe],
  });
  const savedRecipes = new Set();
  cupboards.forEach((cupboard) => {
    cupboard.Recipes.forEach((recipe) => {
      savedRecipes.add(recipe);
    });
  });
  return Array.from(savedRecipes);
};

const loginValidator = [
  check('email').exists({ checkFalsy: true }).withMessage('Please provide a valid email'),
  check('password').exists({ checkFalsy: true }).withMessage('Please provide a valid password'),
];

module.exports = {
  asyncHandler,
  csrfProtection,
  userValidator,
  loginValidator,
  normalizeRecipes,
  getSavedRecipes,
};
