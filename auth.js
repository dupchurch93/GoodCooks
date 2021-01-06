const db = require('./db/models');

const loginUser = (req, res, user) => {
  //saves the user to the session and sets the user id to the primary user key of the database
  req.session.auth = {
    userId: user.id,
  };
};

const restoreUser = async (req, res, next) => {
  //called everytime we go to a new page/path, and checks if the session has the user authentication
  if (req.session.auth) {
    //grabs the userId from the saved session
    const { userId } = req.session.auth;
    //looks for the user in the database and sets the authentication to true if the database finds the user, otherwise throws an error
    try {
      const user = await db.User.findByPk(userId, {
        include: {
          model: db.Cupboard,
          include: db.Recipe,
        },
      });
      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
};

const logoutUser = (req, res) => {
  delete req.session.auth;
};

const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login');
  }
  return next();
};

module.exports = {
  loginUser,
  restoreUser,
  logoutUser,
  requireAuth,
};
