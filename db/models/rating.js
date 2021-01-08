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
    },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Rating.associate = function(models) {
    // associations can be defined here
    Rating.belongsTo(models.User, { foreignKey: 'userId' })
    Rating.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
  };
  return Rating;
};