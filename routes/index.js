var express = require('express');
var router = express.Router();
const { asyncHandler } = require('../utils');
const { Recipe, sequelize, Cupboard_Recipe, Cupboard } = require('../db/models');
const { BandwidthLimitExceeded } = require('http-errors');
const cupboard = require('../db/models/cupboard');

/* GET home page. */
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const recipes = await Recipe.findAll({
      order: sequelize.random(),
      limit: 4,
      include: [Cupboard]
    });
    // Need: everything from recipe. cupboardId (eventually favorite and cooked from joins table)
    const normalizedRecipes = recipes.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        link: recipe.link,
        cupboards: recipe.Cupboards.map((cupboard) => {
          return {
            id: cupboard.id,
            name: cupboard.name,
          }
        })
      }
    });

    // if (res.locals.user) {
    //   const cupboardId = res.locals.user.Cupboards[0].id;
    //   //change to a regular for loop or using map and check each instance in the recipes array
    //   recipes.forEach(async (recipe) => {
    //     const joinRecord = await Cupboard_Recipe.findOne({
    //       where: {
    //         cupboardId: cupboardId,
    //         recipeId: recipe.id,
    //       },
    //     });
    //     if(joinRecord){
    //       recipe.isSaved = true;
    //     } else {
    //       recipe.isSaved = false;
    //     }
    //     // console.log('SAVED', recipe.name, recipe.isSaved);
    //   });
    // }
    // recipes.forEach((recipe) => {
    //   console.log(recipe.name, recipe.isSaved)
    // })
    console.log(normalizedRecipes)
    // console.log(recipes[0].Cupboards[0])
    res.render('index', { title: 'a/A Express Skeleton Home', normalizedRecipes });
  })
);

module.exports = router;
