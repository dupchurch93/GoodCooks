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
    const mostRatedRecipes = await Recipe.findAll({
      attributes: [
        'id',
        'name',
        'author',
        'description',
        'link',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM "Ratings" WHERE "Ratings"."recipeId" = "Recipe".id)'
          ),
          'numRatings',
        ],
      ],
      include: [{ model: Rating }],
      group: ['Recipe.id'],
      order: [[sequelize.literal('"numRatings"'), 'DESC']],
      limit: 3,
    });
    let normalizedRecipes;
    // Need: everything from recipe. cupboardId (eventually favorite and cooked from joins table)
    if (res.locals.user) {
      normalizedRecipes = await normalizeRecipes(recipes, res.locals.user.id);
    } else {
      normalizedRecipes = await normalizeRecipes(recipes);
    }
    res.render('index', {
      title: 'a/A Express Skeleton Home',
      normalizedRecipes,
      mostRatedRecipes,
    });
  })
);

module.exports = router;
