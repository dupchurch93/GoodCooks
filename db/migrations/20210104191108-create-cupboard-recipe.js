'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cupboard_Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cupboardId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: { model: 'Cupboards'}
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: { model: 'Recipes'}
      },
      cooked: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        default: false
      },
      favorited: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
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
    return queryInterface.dropTable('Cupboard_Recipes');
  }
};
