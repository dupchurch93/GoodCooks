var express = require('express');
var router = express.Router();
const { asyncHandler, normalizeRecipes } = require('../utils');
const { Recipe, sequelize, Cupboard_Recipe, Cupboard, Rating } = require('../db/models');

/* GET home page. */
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const recipes = await Recipe.findAll({
      order: sequelize.random(),
      limit: 4,
      include: [Cupboard, Rating],
    });
    let normalizedRecipes;
    // Need: everything from recipe. cupboardId (eventually favorite and cooked from joins table)
    if (res.locals.user) {
      normalizedRecipes = await normalizeRecipes(recipes, res.locals.user.id);
    } else {
      normalizedRecipes = await normalizeRecipes(recipes);
    }
    res.render('index', { title: 'a/A Express Skeleton Home', normalizedRecipes });
  })
);

module.exports = router;
