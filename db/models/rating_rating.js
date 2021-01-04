'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating_Rating = sequelize.define('Rating_Rating', {
    ratingId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {});
  Rating_Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating_Rating;
};