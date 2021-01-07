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
      include: [Cupboard],
    });
    // Need: everything from recipe. cupboardId (eventually favorite and cooked from joins table)
    const normalizedRecipes = recipes.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.name,
        author: recipe.author,
        description: recipe.description,
        link: recipe.link,
        //saved: We are loading all cupboards for the associated recipe
        //Must look at each cupboard and look at userId to compare to current user
        //If user is the same as current for any cupboard, mark saved as true
        // saved: (() => {
        //   let saved = false;
        //   for (let cupboard of recipe.Cupboards) {
        //     console.log(cupboard.Cupboard_Recipe)
        //     if (res.locals.user) {
        //       let saved = (cupboard.userId === res.locals.user.id)
        //       if (saved === true) return saved;
        //     }
        //   }
        //   return saved;
        // })(),
        status: (() => {
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
        })(),
        cupboards: recipe.Cupboards.map((cupboard) => {
          return {
            id: cupboard.id,
            name: cupboard.name,
          };
        }),
      };
    });
    res.render('index', { title: 'a/A Express Skeleton Home', normalizedRecipes });
  })
);

module.exports = router;
