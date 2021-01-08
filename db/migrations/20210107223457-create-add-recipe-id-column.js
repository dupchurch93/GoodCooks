'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Ratings',
      'recipeId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Recipes'}
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('addRecipeIdColumns');
  }
};
