const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const { User, Recipe, sequelize, Cupboard_Recipe } = require('../db/models/');


router.post(
  '/recipes/saveRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId } = req.body;
    const { cupboardId } = req.body;
    console.log(req.body)
    const recordsCreated = await Cupboard_Recipe.create({
      recipeId,
      cupboardId,
      cooked: false,
      favorited: false
    });
    console.log('recordsCreated: ', recordsCreated)
    res.json({ recordsCreated });
  })
);

// router.post(
//   '/recipes/:recipeId(//d+)/cupboards/:cupboardId(//d+)',
//   asyncHandler(async (req, res) => {
//     const recipeId = req.params.recipeId;
//     const cupboardId = req.params.cupboardId;
//     console.log(recipeId, cupboardId)
//     const recordsCreated = await Cupboard_Recipe.create({
//       recipeId,
//       cupboardId,
//     });
//     res.json({ recordsCreated });
//   })
// );

module.exports = router;
