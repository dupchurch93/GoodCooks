'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipe_Ratings"', {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipe_Ratings');
  },
};
