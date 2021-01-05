'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe_Rating = sequelize.define('Recipe_Rating', {
    ratingId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {});
  Recipe_Rating.associate = function(models) {
    // associations can be defined here
  };
  return Recipe_Rating;
};