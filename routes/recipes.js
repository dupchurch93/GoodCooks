const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('../utils');
const { User, Recipe, sequelize, Cupboard } = require('../db/models/');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const recipes = await Recipe.findAll({
      order: sequelize.random(),
    });
    res.render('recipes', { title: 'Browse Recipes', recipes });
  })
);

router.get('/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findOne({ where: {id: recipeId}, include: [Cupboard]});
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
    recipe.instructions = splitIngredients(recipe);
    res.render('recipe', {
      title: recipe.name,
      recipe,
      csrfToken: req.csrfToken(),
    });
  }));

module.exports = router;

const splitIngredients = (recipe) => {
  return recipe.ingredients.split(',');
};

const splitInstructions = (recipe) => {
  const instructions = recipe.instructions.split()
}
