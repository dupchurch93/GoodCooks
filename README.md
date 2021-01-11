# Welcome to GoodCooks!
### Live Link: [GoodCooks]

GoodCooks is inspired by [GoodReads] and allows users to browse a database of recipes. Users can save recipes to their cupboards, mark their saved recipes as cooked or favorited, and leave reviews on their favorite recipes.

## Technologies

#### Front End
  - JavaScript
  - HTML rendered through PUG templating
  - CSS styling
  - Font Awesome library for icons
  - Hosted on Heroku
#### Back End
  - Built with Express.js
  - Uses a PostgreSQL Database
  - Sequelize.js
  - Express Validator Library
  - CSURF Library

## Features
  - Secure authentication using bcryptjs library
  - Only grants access to features like saving and cupboards to authorized users
  - Designed around a relational database schema, which allows users to save, rate, and view recipes with dynamic data and rendering
  - Makes use of AJAX to render elements such as ratings asynchronously
  - Includes protection from csrf attacks and performs front-end and back-end validation on forms

## Code Highlights and Challenges
  - Accessing all our recipe data was a bit of a challenge at first due to storing additional data in a joins table. To access our data in a succinct way we ended up creating a normalization function that we imported into any of our routes that needed to access ratings and cupboards.
  ```
  const normalizeRecipe = (recipe, resUserId = undefined) => {
  const normalized = {
    id: recipe.id,
    name: recipe.name,
    author: recipe.author,
    description: recipe.description,
    link: recipe.link,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    status: (() => {
      const status = {
        saved: false,
        cooked: false,
        favorited: false,
        starRating: false,
      };
      if (resUserId) {
        for (let cupboard of recipe.Cupboards) {
          if (cupboard.userId === resUserId) {
            status.saved = true;
            if (cupboard.Cupboard_Recipe.cooked) {
              status.cooked = true;
            }
            if (cupboard.Cupboard_Recipe.favorited) {
              status.favorited = true;
            }
          }
        }
        if (recipe.Ratings.length) {
          for (let rating of recipe.Ratings) {
            if (rating.userId === resUserId) {
              status.starRating = rating.starRating;
            }
          }
        }
      }
      return status;
    })(),
    cupboards: recipe.Cupboards.map((cupboard) => {
      return {
        id: cupboard.id,
        name: cupboard.name,
      };
    }),
  };
  return normalized;
};
  ```

## Future Implementations
  - Manually search through recipes
  - Follow and view other users' cupboards and profiles
  - Create custom cupboards to save and organize their recipe library

[GoodReads]: https://www.goodreads.com/

[GoodCooks]: https://goodcooks.herokuapp.com/
