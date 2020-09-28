var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user/profile', function(req, res, next) {
  res.render('/user/profile');
});

router.get('/user/orders', function(req, res, next) {
  res.render('/user/orders');
});

module.exports = router;
