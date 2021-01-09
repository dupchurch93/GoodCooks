const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection, normalizeRecipes } = require('../utils');
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
    const recipe = await Recipe.findOne({ where: { id: recipeId }, include: [Cupboard] });
    const status = (() => {
      const status = {
        saved: false,
        cooked: false,
        favorited: false,
      };
      if (res.locals.user) {
        for (let cupboard of recipe.Cupboards) {
          if (cupboard.userId === res.locals.user.id) {
            status.saved = true;
            if (cupboard.Cupboard_Recipe.cooked) {
              status.cooked = true;
            }
            if (cupboard.Cupboard_Recipe.favorited) {
              status.favorited = true;
            }
          }
        }
      }
      return status;
    })();
    recipe.status = status;
    recipe.ingredients = splitIngredients(recipe);
    console.log(recipe.ingredients);
    res.render('recipe', {
      title: recipe.name,
      recipe,
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
