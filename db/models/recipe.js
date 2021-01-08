'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    'Recipe',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      ingredients: DataTypes.TEXT,
      instructions: DataTypes.TEXT,
      author: DataTypes.STRING,
      link: DataTypes.STRING,
    },
    {}
  );
  Recipe.associate = function (models) {
    // associations can be defined here
    const columnMapping = {
      through: 'Cupboard_Recipe',
      foreignKey: 'recipeId',
      otherKey: 'cupboardId',
    };

    Recipe.hasMany(models.Rating, { foreignKey: 'recipeId'});
    Recipe.belongsToMany(models.Cupboard, columnMapping);
  };
  return Recipe;
};
