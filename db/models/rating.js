'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      userId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      starRating: { type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    }
    },
    {}
  );
  Rating.associate = function(models) {
    // associations can be defined here
    Rating.belongsTo(models.User, { foreignKey: 'userId' })
    const columnMapping = {
      through: "Recipe_Rating",
      foreignKey: "ratingId",
      otherKey: "recipeId",
    };
    Rating.belongsToMany(models.Recipe, columnMapping);
  };
  return Rating;
};