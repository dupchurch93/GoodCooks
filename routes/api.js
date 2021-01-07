const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const { User, Recipe, sequelize, Cupboard_Recipe } = require('../db/models/');

router.post(
  '/recipes/saveRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId } = req.body;
    const { cupboardId } = req.body;
    const recordsCreated = await Cupboard_Recipe.create({
      recipeId,
      cupboardId,
      cooked: false,
      favorited: false
    });
    res.json({ recordsCreated });
  })
);

router.delete(
  '/recipes/unsaveRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId } = req.body;
    const { cupboardId } = req.body;
    const recordsDestroyed = await Cupboard_Recipe.destroy({
      where: {
        cupboardId,
        recipeId
      }});
    res.json({ recordsDestroyed });
  })
);

module.exports = router;
