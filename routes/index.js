var express = require('express');
var router = express.Router();
const { asyncHandler } = require('../utils');
const { Recipe, sequelize, Cupboard_Recipe } = require('../db/models');
const { BandwidthLimitExceeded } = require('http-errors');

/* GET home page. */
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const recipes = await Recipe.findAll({
      order: sequelize.random(),
      limit: 4,
    });
    let isSaved;
    if (res.locals.user) {
      const cupboardId = res.locals.user.Cupboards[0].id;
      recipes.forEach(async (recipe) => {
        const joinRecord = await Cupboard_Recipe.findOne({
          where: {
            cupboardId: cupboardId,
            recipeId: recipe.id,
          },
        });
        // console.log('is Saved', isSaved);
        if (joinRecord) {
          isSaved = true;
        } else {
          isSaved = false;
        }

        recipe.isSaved = isSaved;
        console.log('SAVED', recipe.isSaved);
      });
    }
    // console.log(
    //   'ARRAY',
    //   arrayOfSavedRecipes.map((record) => record.cupboardId)
    // );
    console.log('recipes', recipes);
    res.render('index', { title: 'a/A Express Skeleton Home', recipes });
  })
);

module.exports = router;
