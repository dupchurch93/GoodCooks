'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    // userId, content, starRating, createdAt, updatedAt, recipeId
    return queryInterface.bulkInsert('Ratings', [
      {
        userId: 1,
        content: "Tasted like food from the gods",
        starRating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        recipeId: 5
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
