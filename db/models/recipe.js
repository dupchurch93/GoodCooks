'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    ingredients: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    author: DataTypes.STRING
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: 'Cupboard_Recipe',
      foreignKey: 'recipeId',
      otherKey: 'cupboardId'
    }
    const columnMapping2 = {
      through: "Recipe_Rating",
      foreignKey: "recipeId",
      otherKey: "ratingId",
    };
   Recipe.belongsToMany(models.Rating, columnMapping2);
    Recipe.belongsToMany(models.Cupboard, columnMapping)
  };
  return Recipe;
};