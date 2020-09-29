var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Lens = require('../models/Lens')

/* GET users listing. */
router.get('/profile', async function(req, res, next) {
  const user = await User.find({username:'FOO'})
  
  res.render('user/profile', { user: user[0], js: ['btnEdit']});
});

router.get('/orders', async function(req, res, next) {
  const user = await User.find({username:'FOO'}).lean().populate('')
  const lens = await Lens.find({_id: user[0].info.id_ContactLens}) 
  console.log(user)
  res.render('user/orders', { user: user[0], lens: lens[0], js: ['btnEdit'] });
});

module.exports = router;

