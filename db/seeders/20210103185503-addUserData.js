'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert(
     "Users",
     [
       {
         username: "demouser",
         email: "demo@demo.com",
         hashedPassword:
           "$2y$10$N1KkLg5LXz7HzvVZD8Fz8OCRJa6q7L8Zj/7A1OjG/hkzZoYzlz5Ie",
         createdAt: new Date("2021-01-05"),
         updatedAt: new Date("2021-01-05"),
       },
       {
         username: "demouser2",
         email: "demo2@demo.com",
         hashedPassword:"$2y$10$tDc.GHOtOAcAYRnA60vaY.YC6wEA8hHhdlsaOEWJgwlS7ZiimToaO",
         createdAt: new Date("2021-01-05"),
         updatedAt: new Date("2021-01-05"),
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
   return queryInterface.bulkDelete('Users', null, {});
  }
};
