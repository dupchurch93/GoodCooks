const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection, normalizeRecipes, normalizeRecipe } = require('../utils');
const { User, Recipe, sequelize, Cupboard, Rating } = require('../db/models/');

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

router.get(
  '/:id(\\d+)',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findOne({ where: { id: recipeId }, include: [Cupboard, Rating] });
    const normalizedRecipe = normalizeRecipe(recipe, res.locals.user.id);
    console.log(normalizedRecipe.status)
    normalizeRecipe.ingredients = splitIngredients(normalizedRecipe, ',');
    res.render('recipe', {
      title: normalizeRecipe.name,
      normalizedRecipe,
      csrfToken: req.csrfToken(),
    });
  })
);


router.get('/:id(\\d+)/review', asyncHandler(async (req, res) => {

  })
);




module.exports = router;

const splitIngredients = (recipe) => {
  return recipe.ingredients.split(',');
};
