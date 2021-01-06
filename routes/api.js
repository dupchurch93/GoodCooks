const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const { User, Recipe, sequelize, Cupboard_Recipe } = require('../db/models/');

router.post(
  '/recipes/:recipeId/cupboards/:cupboardId',
  asyncHandler(async (req, res) => {
    const recipeId = req.params.recipeId;
    const cupboardId = req.params.cupboardId;
    const recordsCreated = await Cupboard_Recipe.create({
      recipeId,
      cupboardId,
    });
    res.json({ recordsCreated });
  })
);

module.exports = router;
