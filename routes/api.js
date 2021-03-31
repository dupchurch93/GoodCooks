const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection, normalizeRecipe } = require('../utils');
const { User, Recipe, sequelize, Cupboard_Recipe, Cupboard, Rating } = require('../db/models/');
const { validationResult } = require('express-validator');

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
    res.json({ recordsUpdated });
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
    res.json({ recordsUpdated });
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
    res.json({ recordsUpdated });
  })
);

router.patch(
  '/recipes/unfavoriteRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId, cupboardId } = req.body;
    const recordsUpdated = await Cupboard_Recipe.update(
      { favorited: false },
      {
        where: {
          recipeId,
          cupboardId,
        },
      }
    );
    res.json({ recordsUpdated });
  })
);

//Rating recipes
router.post(
  '/recipes/rateRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId, starRating, content } = req.body;
    const userId = res.locals.user.id;
    const ratingsCreated = await Rating.create({
      recipeId,
      starRating,
      content,
      userId,
    });
    res.json({ starRating });
  })
);

//patch request for user clicking on a star button to change their rating
router.patch(
  '/recipes/updateRateRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId, starRating, content } = req.body;
    const userId = res.locals.user.id;
    const udpatedRating = await Rating.update(
      { starRating: starRating, content },
      {
        where: {
          recipeId,
          userId,
        },
      }
    );
    res.json({ starRating });
  })
);

router.post(
  '/recipes/updateRateRecipe',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { recipeId, content } = req.body;
    const userId = res.locals.user.id;
    const recipe = await Recipe.findOne({
      where: { id: recipeId },
      include: [Cupboard, Rating],
    });
    const normalizedRecipe = normalizeRecipe(recipe, userId);
    if (normalizedRecipe.status.starRating) {
      const updatedRecipe = await Rating.update(
        { content },
        {
          where: {
            recipeId,
            userId,
          },
        }
      );
      res.redirect(`/recipes/${recipeId}`);
    } else {
      res.render('recipe-review', {
        title: normalizedRecipe.name,
        normalizedRecipe,
        errors: ['Please leave a star rating for the recipe before leaving a review.'],
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.delete(
  '/recipes/deleteRateRecipe',
  asyncHandler(async (req, res) => {
    const { recipeId } = req.body;
    const userId = res.locals.user.id;
    const deleteRating = await Rating.destroy({
      where: {
        recipeId,
        userId,
      },
    });
    res.json({ deleteRating });
  })
);

module.exports = router;
