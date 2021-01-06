var express = require('express');
var router = express.Router();
const { asyncHandler } = require('../utils');
const { Recipe, sequelize } = require('../db/models');
const { BandwidthLimitExceeded } = require('http-errors');

/* GET home page. */
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const recipes = await Recipe.findAll({
      order: sequelize.random(),
      limit: 4,
    });

    res.render('index', { title: 'a/A Express Skeleton Home', recipes });
  })
);

module.exports = router;
