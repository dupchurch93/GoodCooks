const express = require('express');
const router = express.Router();
const {
  asyncHandler,
  getSavedRecipes,
  normalizeRecipes,
  normalizeRecipesFromUser,
} = require('../utils');
const { User, Cupboard, Recipe, Cupboard_Recipe, Rating } = require('../db/models/');

router.get(
  '/saved',
  asyncHandler(async (req, res) => {
    //query for user's cupboards
    const savedRecipes = await getSavedRecipes(res.locals.user.id);
    const normalizedSavedRecipes = normalizeRecipesFromUser(savedRecipes, res.locals.user.id);
    // console.log(normalizedSavedRecipes)
    // normalizedSavedRecipes.forEach(recipe => {
    //   console.log(recipe.status)
    // });
    res.render('saved-recipes', { title: 'Saved Recipes', normalizedSavedRecipes });
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
