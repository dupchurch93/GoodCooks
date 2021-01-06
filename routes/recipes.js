const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('../utils');
const { User, Recipe, sequelize } = require('../db/models/');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const recipes = await Recipe.findAll({
      order: sequelize.random(),
    });
    res.render('recipes', { title: 'Browse Recipes', recipes });
  })
);

router.get('/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findByPk(recipeId);
    res.render('recipe', {
      title: recipe.name,
      recipe,
      csrfToken: req.csrfToken(),
    });
  }));

module.exports = router;
