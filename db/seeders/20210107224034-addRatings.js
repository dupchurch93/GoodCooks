"use strict";

const randomComments = [
  "Amazing, definitely recommend",
  "Does not come out as good as it looks",
  "Seriously tasty",
  "Can't wait to have again",
  "This chef is a genius",
  "I think I did something wrong or the recipe has too much salt",
  "Wowza, just fantastic",
  "You have to be really careful cooking this to follow the instructions exactly the way they are specific but if you do that you treated to one tasty treat.",
  "Great for a BBQ",
  "Make for a picnic and enjoy",
  "Add some mayo and this is great.",
  "Sounds weird, but add mustard when serving. Trust me.",
  "Too spicy",
  "Too sweet",
  "Not amazing, but not terrible. Solid",
  "A breeze to make!"
];

const randomRatings = [];
for(let i = 0; i < 100; i++){
  randomRatings.push({
    userId: Math.floor(Math.random() * (30-1) + 1),
    content: randomComments[Math.floor(Math.random() * randomComments.length)],
    starRating: Math.floor(Math.random() * (5 -1) + 1),
    createdAt: new Date(),
    updatedAt: new Date(),
    recipeId: Math.floor(Math.random() * (10 - 1) + 1)
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    // userId, content, starRating, createdAt, updatedAt, recipeId
    return queryInterface.bulkInsert(
      "Ratings",
      [
        {
          userId: 1,
          content: "Tasted like food from the gods.",
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 5,
        },
        {
          userId: 1,
          content: "I love a good burger!",
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 2,
        },
        {
          userId: 1,
          content:
            "Honestly, who knew it was so easy to solve a chocolate cake craving? A slight chewiness, but gets the job done.",
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
          content:
            "I just air fried frozen mozzarella sticks from the store. No regrets.",
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 3,
        },
        {
          userId: 2,
          content: "So warm and hearty!",
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
          content: "Try it with a bit of salsa on top!",
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 5,
        },
        {
          userId: 2,
          content: "I wish I liked grilled cheese more, oh well!",
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
          content:
            "I added a bit of peppermint to mine. So good on a cold night.",
          starRating: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 8,
        },
        {
          userId: 2,
          content:
            "Sorry but I hated it. Came out soggy, wish the instructions were better...",
          starRating: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 9,
        },
        {
          userId: 2,
          content:
            "I do not really like pretzels, but my kids ate these up in a heartbeat!",
          starRating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipeId: 10,
        },
        ...randomRatings
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
    return queryInterface.bulkDelete("Ratings", null, {});
  },
};
