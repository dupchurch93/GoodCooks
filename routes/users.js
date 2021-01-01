const express = require('express');
const router = express.Router();
const {asyncHandler, csrfProtection} = require('../utils');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//add a new user
router.post('/users', csrfProtection, asyncHandler(async (req, res) => {

}));

module.exports = router;
