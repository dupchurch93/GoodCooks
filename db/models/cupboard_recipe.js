'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cupboard_Recipe = sequelize.define('Cupboard_Recipe', {
    cupboardId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    cooked: DataTypes.BOOLEAN,
    favorited: DataTypes.BOOLEAN
  }, {});
  Cupboard_Recipe.associate = function(models) {
    // associations can be defined here
  };
  return Cupboard_Recipe;
};