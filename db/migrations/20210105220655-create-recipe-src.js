'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Recipes', 'link', Sequelize.STRING);
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('Recipes', 'link');
  },
};
