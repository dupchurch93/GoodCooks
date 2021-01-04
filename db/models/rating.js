'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    starRating: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
    Rating.hasMany(models.User, { foreignKey: 'userId' })
    const columnMapping = {
      through: "Recipe_Rating",
      foreignKey: "ratingId",
      otherKey: "recipeId",
    };
    Rating.belongsToMany(models.Recipe, columnMapping);
  };
  return Rating;
};