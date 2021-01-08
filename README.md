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

## Future Implementations
  - Manually search through recipes
  - Follow and view other users' cupboards and profiles
  - Create custom cupboards to save and organize their recipe library

[GoodReads]: https://www.goodreads.com/

[GoodCooks]: https://goodcooks.herokuapp.com/
