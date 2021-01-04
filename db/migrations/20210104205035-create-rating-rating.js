'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rating_Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ratingId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: { model: 'Ratings'}
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: { model: 'Recipes' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rating_Ratings');
  }
};