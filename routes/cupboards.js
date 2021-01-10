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
    res.render('saved-recipes', { title: 'Saved Recipes', recipes: normalizedSavedRecipes });
  })
);

router.get(
  '/cooked',
  asyncHandler(async (req, res) => {
    const savedRecipes = await getSavedRecipes(res.locals.user.id);
    const normalizedSavedRecipes = normalizeRecipesFromUser(savedRecipes, res.locals.user.id);
    const cookedRecipes = [];
    normalizedSavedRecipes.forEach((recipe) => {
      if (recipe.status.cooked) {
        cookedRecipes.push(recipe);
      }
    });
    res.render('saved-recipes', { title: 'Cooked Recipes', recipes: cookedRecipes });
  })
);

router.get(
  '/uncooked',
  asyncHandler(async (req, res) => {
    const savedRecipes = await getSavedRecipes(res.locals.user.id);
    const normalizedSavedRecipes = normalizeRecipesFromUser(savedRecipes, res.locals.user.id);
    const uncookedRecipes = [];
    normalizedSavedRecipes.forEach((recipe) => {
      if (!recipe.status.cooked) {
        uncookedRecipes.push(recipe);
      }
    });
    res.render('saved-recipes', { title: 'Uncooked Recipes', recipes: uncookedRecipes });
  })
);

router.get(
  '/favorited',
  asyncHandler(async (req, res) => {
    const savedRecipes = await getSavedRecipes(res.locals.user.id);
    const normalizedSavedRecipes = normalizeRecipesFromUser(savedRecipes, res.locals.user.id);
    const favoritedRecipes = [];
    normalizedSavedRecipes.forEach((recipe) => {
      if (recipe.status.cooked) {
        favoritedRecipes.push(recipe);
      }
    });
    res.render('saved-recipes', { title: 'Favorited Recipes', recipes: favoritedRecipes });
  })
);

module.exports = router;
