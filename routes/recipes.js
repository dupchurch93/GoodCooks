const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection, normalizeRecipes, normalizeRecipe } = require('../utils');
const { User, Recipe, sequelize, Cupboard, Rating } = require('../db/models/');

router.get(
  '/',
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
    res.render('recipes', { title: 'Browse Recipes', normalizedRecipes });
  })
);

router.get(
  '/:id(\\d+)',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findOne({ where: { id: recipeId }, include: [Cupboard, Rating] });
    const normalizedRecipe = normalizeRecipe(recipe, res.locals.user.id);
    normalizedRecipe.ingredients = splitIngredients(normalizedRecipe, ',');
    res.render('recipe', {
      title: normalizeRecipe.name,
      normalizedRecipe,
      csrfToken: req.csrfToken(),
    });
  })
);


router.get('/:id(\\d+)/review',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findOne({ where: { id: recipeId }, include: [Cupboard, Rating] });
    const normalizedRecipe = normalizeRecipe(recipe, res.locals.user.id);
    normalizedRecipe.ingredients = splitIngredients(normalizedRecipe, ',');
    res.render('recipe-review', {
      title: normalizedRecipe.name,
      normalizedRecipe,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  '/:id(\\d+)/review',
  csrfProtection,
  asyncHandler(async (req, res) => {
    // console.log('req.body', req.body);
    const { username, email, password } = req.body;
    const user = User.build({ username, email });

    const validatorErrors = validationResult(req);
    console.log('ERROR!!!!', validatorErrors);
    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      await Cupboard.create({ userId: user.id, name: 'default' })
      loginUser(req, res, user);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('user-register', {
        title: 'Register',
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);



module.exports = router;

const splitIngredients = (recipe) => {
  return recipe.ingredients.split(',');
};
