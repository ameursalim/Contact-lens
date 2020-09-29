var express = require('express');
var router = express.Router();
const User = require('../models/User')

/* GET users listing. */
router.get('/profile', async function(req, res, next) {
  const user = await User.find({username:'FOO'})
  console.log(user)
  res.render('user/profile', { user, js: ['btnEdit']});
});

router.get('/orders', function(req, res, next) {
  res.render('user/orders', { js: ['btnEdit'] });
});

module.exports = router;

