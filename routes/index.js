var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  user = req.user;
  res.render('index', { title: 'a/A Express Skeleton Home' , user});
});

module.exports = router;
