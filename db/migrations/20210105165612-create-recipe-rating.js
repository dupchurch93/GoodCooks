'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Recipe_Ratings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ratingId: {
        type: Sequelize.INTEGER,
        references: { model: "Ratings" },
        allowNull: false,
      },
      recipeId: {
        type: Sequelize.INTEGER,
        references: { model: "Recipes" },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipe_Ratings');
  }
};