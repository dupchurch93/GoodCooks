const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const { User, Recipe, sequelize, Cupboard_Recipe } = require('../db/models/');

router.post(
  '/recipes/saveRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId, cupboardId, cooked, favorited } = req.body;
    const recordsCreated = await Cupboard_Recipe.create({
      recipeId,
      cupboardId,
      cooked,
      favorited,
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
        recipeId,
      },
    });
    res.json({ recordsDestroyed });
  })
);

router.patch(
  '/recipes/cookRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId, cupboardId } = req.body;
    const recordsUpdated = await Cupboard_Recipe.update(
      { cooked: true },
      {
        where: {
          recipeId,
          cupboardId,
        },
      }
    );
    res.json({recordsUpdated});
  })
);

router.patch(
  '/recipes/uncookRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId, cupboardId } = req.body;
    const recordsUpdated = await Cupboard_Recipe.update(
      { cooked: false },
      {
        where: {
          recipeId,
          cupboardId,
        },
      }
    );
    res.json({recordsUpdated});
  })
);

router.patch(
  '/recipes/favoriteRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId, cupboardId } = req.body;
    const recordsUpdated = await Cupboard_Recipe.update(
      { favorited: true },
      {
        where: {
          recipeId,
          cupboardId,
        },
      }
    );
    res.json({recordsUpdated});
  })
);

router.patch(
  '/recipes/unfavoriteRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId, cupboardId } = req.body;
    const recordsUpdated = await Cupboard_Recipe.update(
      { favoriteded: false },
      {
        where: {
          recipeId,
          cupboardId,
        },
      }
    );
    res.json({recordsUpdated});
  })
);

//Rating recipes
router.post('/recipes/rateRecipe', asyncHandler(async(req, res) => {
  const { recipeId, starRating, content } = req.body;
  const userId = res.locals.user.id
  const ratingsCreated = await Rating.create({
    recipeId,
    starRating,
    content,
    userId
  });
  res.json({ratingsCreated});
}))
module.exports = router;
