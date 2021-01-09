const express = require('express');
const router = express.Router();
const { asyncHandler, getSavedRecipes, normalizeRecipes, normalizeRecipesFromUser } = require('../utils');
const { User, Cupboard, Recipe, Cupboard_Recipe, Rating } = require('../db/models/');

router.get(
  '/saved',
  asyncHandler(async (req, res) => {
    //query for user's cupboards
    const savedRecipes = await getSavedRecipes(res.locals.user.id);
    const normalizedSavedRecipes =  normalizeRecipesFromUser(savedRecipes, res.locals.user.id);
    res.send('Hello');
  })
);

router.get(
  '/cooked',
  asyncHandler(async (req, res) => {
    const savedRecipes = await getSavedRecipes(res.locals.user.id);
    const normalizedSavedRecipes =  normalizeRecipesFromUser(savedRecipes, res.locals.user.id);
    const cookedRecipes = [];
    normalizedSavedRecipes.forEach((recipe) => {
      if(recipe.status.cooked){
        cookedRecipes.push(recipe);
      }
    });
    res.send(cookedRecipes)
  })
);

router.get(
  '/uncooked',
  asyncHandler(async (req, res) => {
    const savedRecipes = await getSavedRecipes(res.locals.user.id);
    const normalizedSavedRecipes =  normalizeRecipesFromUser(savedRecipes, res.locals.user.id);
    const uncookedRecipes = [];
    normalizedSavedRecipes.forEach((recipe) => {
      if(!recipe.status.cooked){
        uncookedRecipes.push(recipe);
      }
    });
    res.send(uncookedRecipes)
  })
);

router.get(
  '/favorited',
  asyncHandler(async (req, res) => {
    const savedRecipes = await getSavedRecipes(res.locals.user.id);
    const normalizedSavedRecipes =  normalizeRecipesFromUser(savedRecipes, res.locals.user.id);
    const favoritedRecipes = [];
    normalizedSavedRecipes.forEach((recipe) => {
      if(recipe.status.cooked){
        favoritedRecipes.push(recipe);
      }
    });
    res.send(favoritedRecipes)
  })
);

module.exports = router;
