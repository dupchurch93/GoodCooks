const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection, normalizeRecipes, normalizeRecipe } = require('../utils');
const { User, Recipe, sequelize, Cupboard, Rating } = require('../db/models/');

// returns all recipes
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const recipes = await Recipe.findAll({
      order: sequelize.random(),
      include: [Cupboard, Rating],
    });
    let normalizedRecipes;
    if (res.locals.user) {
      normalizedRecipes = await normalizeRecipes(recipes, res.locals.user.id);
    } else {
      normalizedRecipes = await normalizeRecipes(recipes);
    }
    res.render('recipes', { title: 'Browse Recipes', normalizedRecipes });
  })
);

//returns a specific recipe
router.get(
  '/:id(\\d+)',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findOne({
      where: { id: recipeId },
      include: [Cupboard, Rating],
    });
    for (let rating of recipe.Ratings) {
      // console.log('recipe here---------', rating);
    }
    let avgRating;
    let ratings;
    let userRating;
    // console.log('USER', res.locals.user);
    if (recipe.Ratings.length) {
      // reduce the array of starRatings and divide by array length
      avgRating = Math.floor(
        recipe.Ratings.map((rating) => rating.starRating).reduce((acc, c) => acc + c) /
          recipe.Ratings.length
      );
      // Extract the current logged-in-user's rating if available
      if (res.locals.authenticated) {
        ratings = recipe.Ratings.filter((rating) => rating.userId !== res.locals.user.id);
        userRating = recipe.Ratings.filter((rating) => rating.userId === res.locals.user.id)[0];
      } else {
        ratings = recipe.Ratings;
      }
    }
    let normalizedRecipe;
    if (res.locals.user) {
      normalizedRecipe = normalizeRecipe(recipe, res.locals.user.id);
    } else {
      normalizedRecipe = normalizeRecipe(recipe);
    }
    console.log(ratings);
    normalizedRecipe.ingredients = splitIngredients(normalizedRecipe, ',');
    res.render('recipe', {
      title: normalizedRecipe.name,
      normalizedRecipe,
      ratings,
      avgRating,
      userRating,
      csrfToken: req.csrfToken(),
    });
  })
);

router.get(
  '/:id(\\d+)/review',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findOne({ where: { id: recipeId }, include: [Cupboard, Rating] });
    const normalizedRecipe = normalizeRecipe(recipe, res.locals.user.id);
    normalizedRecipe.ingredients = splitIngredients(normalizedRecipe, ',');
    res.render('recipe-review', {
      title: normalizedRecipe.name,
      normalizedRecipe,
      csrfToken: req.csrfToken(),
    });
  })
);

// router.post(
//   '/:id(\\d+)/review',
//   csrfProtection,
//   asyncHandler(async (req, res) => {
//     // console.log('req.body', req.body);
//     const recipeId = req.params.id;
//     const recipe = await Recipe.findOne({ where: { id: recipeId }, include: [Cupboard, Rating] });
//     }
// );

module.exports = router;

const splitIngredients = (recipe) => {
  return recipe.ingredients.split(',');
};
