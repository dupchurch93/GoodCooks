const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const { User, Recipe, sequelize } = require('../db/models/');

router.get('/', asyncHandler(async (req, res) => {
    const recipes = await Recipe.findAll({
        order: sequelize.random()
      });
      res.render('recipes', { title: 'Browse Recipes', recipes });
}));





module.exports = router;
