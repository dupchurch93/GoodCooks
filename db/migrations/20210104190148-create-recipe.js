'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      ingredients: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      instructions: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      author: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull:false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipes');
  }
};