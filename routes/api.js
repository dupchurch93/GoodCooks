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

module.exports = router;
