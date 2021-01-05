'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Cupboards',
      [
        {
          id: 1,
          userId: 1,
          name: 'Saved Recipes',
          createdAt: new Date('2021-01-05'),
          updatedAt: new Date('2021-01-05'),
        },
        {
          id: 2,
          userId: 2,
          name: 'Saved Recipes',
          createdAt: new Date('2021-01-05'),
          updatedAt: new Date('2021-01-05'),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Cupboards', null, {});
  },
};
