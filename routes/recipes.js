const express = require("express");
const router = express.Router();
const {
  asyncHandler,
  normalizeRecipes,
  normalizeRecipe,
  csrfProtection
} = require("../utils");
const { User, Recipe, sequelize, Cupboard, Rating } = require("../db/models/");
const { Op } = require("sequelize");

// returns all recipes
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const recipes = await Recipe.findAll({
      order: sequelize.random(),
      include: [Cupboard, Rating],
    });
    let normalizedRecipes;
    if (res.locals.user) {
      normalizedRecipes = await normalizeRecipes(recipes, res.locals.user.id);
    } else {
      normalizedRecipes = await normalizeRecipes(recipes);
    }
    res.render("recipes", {
      title: "Browse Recipes",
      normalizedRecipes,
    });
  })
);

//returns a specific recipe
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findOne({
      where: { id: recipeId },
      include: [Cupboard, { model: Rating, include: [User] }],
    });
    let avgRating;
    let ratings;
    let userRating;
    // console.log('USER', res.locals.user);
    if (recipe.Ratings.length) {
      // reduce the array of starRatings and divide by array length
      avgRating = Math.floor(
        recipe.Ratings.map((rating) => rating.starRating).reduce(
          (acc, c) => acc + c
        ) / recipe.Ratings.length
      );
      // Extract the current logged-in-user's rating if available
      if (res.locals.authenticated) {
        ratings = recipe.Ratings.filter(
          (rating) => rating.userId !== res.locals.user.id
        );
        userRating = recipe.Ratings.filter(
          (rating) => rating.userId === res.locals.user.id
        )[0];
      } else {
        ratings = recipe.Ratings;
      }
    }
    let normalizedRecipe;
    if (res.locals.user) {
      normalizedRecipe = normalizeRecipe(recipe, res.locals.user.id);
    } else {
      normalizedRecipe = normalizeRecipe(recipe);
    }
    //split the ingredients list
    normalizedRecipe.ingredients = splitIngredients(normalizedRecipe, ",");
    //split the instructions list on the numbers and remove the first empty string
    normalizedRecipe.instructions = splitInstructions(normalizedRecipe);
<<<<<<< HEAD
    res.render('recipe', {
=======
    res.render("recipe", {
>>>>>>> main
      title: normalizedRecipe.name,
      normalizedRecipe,
      ratings,
      avgRating,
      userRating,
    });
  })
);

router.get(
  "/:id(\\d+)/review",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findOne({
      where: { id: recipeId },
      include: [Cupboard, Rating],
    });
    const normalizedRecipe = normalizeRecipe(recipe, res.locals.user.id);
    normalizedRecipe.ingredients = splitIngredients(normalizedRecipe, ",");
    res.render("recipe-review", {
      title: normalizedRecipe.name,
      normalizedRecipe,
      csrfToken: req.csrfToken(),
    });
  })
);


router.get(
  "/search",
  asyncHandler(async (req, res) => {
    const {search} = req.query;
    const recipes = await Recipe.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
      include: [Cupboard, Rating],
    });
    let normalizedRecipes;
    if (res.locals.user) {
      normalizedRecipes = await normalizeRecipes(recipes, res.locals.user.id);
    } else {
      normalizedRecipes = await normalizeRecipes(recipes);
    }
    if (normalizedRecipes) {
      res.render("recipes", {
        title: "Browse Recipes",
        normalizedRecipes,
      });
    } else{
    }
  })
);

module.exports = router;

const splitIngredients = (recipe) => {
  return recipe.ingredients.split(":");
};

const splitInstructions = (recipe) => {
  const instructions = recipe.instructions.split(/\d\. /);
  instructions.shift();
  return instructions;
};
