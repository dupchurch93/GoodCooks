'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cupboard = sequelize.define('Cupboard', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  Cupboard.associate = function(models) {
    // associations can be defined here

    Cupboard.hasMany(models.User, { foreignKey: 'userId'})
    const columnMapping = {
      through: 'Cupboard_Recipe',
      foreignKey: 'cupboardId',
      otherKey: 'recipeId'

    }
    Cupboard.belongsToMany(models.Recipe, columnMapping)
  };
  return Cupboard;
};