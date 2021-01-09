const express = require('express');
const router = express.Router();
const { asyncHandler, getSavedRecipes } = require('../utils');
const { User, Cupboard, Recipe } = require('../db/models/');

router.get(
  '/saved',
  asyncHandler(async (req, res) => {
    //query for user's cupboards
    const savedRecipes = await getSavedRecipes(res.locals.user.id);
    console.log(savedRecipes);
    res.send('Hello');
  })
);

router.get(
  '/cooked',
  asyncHandler(async (req, res) => {
    //query for user's saved recipes
  })
);

router.get(
  '/uncooked',
  asyncHandler(async (req, res) => {
    //query for user's saved recipes
  })
);

router.get(
  '/favorited',
  asyncHandler(async (req, res) => {
    //query for user's saved recipes
  })
);

module.exports = router;
