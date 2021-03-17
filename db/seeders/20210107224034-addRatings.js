'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    // userId, content, starRating, createdAt, updatedAt, recipeId
    return queryInterface.bulkInsert(
      'Ratings',
      [
        {
          userId: 1,
          content: 'Tasted like food from the gods.',
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 5,
        },
        {
          userId: 1,
          content: 'I love a good burger!',
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 2,
        },
        {
          userId: 1,
          content:
            'Honestly, who knew it was so easy to solve a chocolate cake craving? A slight chewiness, but gets the job done.',
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 4,
        },
        {
          userId: 1,
          starRating: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 9,
        },
        {
          userId: 1,
          content: 'I just air fried frozen mozzarella sticks from the store. No regrets.',
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 3,
        },
        {
          userId: 2,
          content: 'So warm and hearty!',
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 1,
        },
        {
          userId: 2,
          content:
            "It's juicy and full of flavor.  Would recommend making it for any BBQ or party!",
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 2,
        },
        {
          userId: 2,
          content: "Almost can't tell it was made in an air fryer!",
          starRating: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 3,
        },
        {
          userId: 2,
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 4,
        },
        {
          userId: 2,
          content: 'Try it with a bit of salsa on top!',
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 5,
        },
        {
          userId: 2,
          content: 'I wish I liked grilled cheese more, oh well!',
          starRating: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 6,
        },
        {
          userId: 2,
          content:
            "Don't judge me but... I really don't know the fuss about these!  Just a little too sweet overall for me.",
          starRating: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 7,
        },
        {
          userId: 2,
          content: 'I added a bit of peppermint to mine. So good on a cold night.',
          starRating: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 8,
        },
        {
          userId: 2,
          content: 'Sorry but I hated it. Came out soggy, wish the instructions were better...',
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 9,
        },
        {
          userId: 2,
          content: 'I do not really like pretzels, but my kids ate these up in a heartbeat!',
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 10,
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
    return queryInterface.bulkDelete('Ratings', null, {});
  },
};
