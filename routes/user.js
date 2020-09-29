var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Lens = require('../models/Lens')

/* GET users listing. */
router.get('/profile', async function(req, res, next) {
  const user = await User.findOne({username:'FOO'})
  
  res.render('user/profile', { user, js: ['btnEdit']});
});

router.get('/orders', async function(req, res, next) {
  const user = await User.findOne({username:'FOO'}).populate("info.id_ContactLens")

  const lens = await Lens.find({_id: user.info.id_ContactLens}) 
  console.log(user)
  res.render('user/orders', { user, lens: lens[0], js: ['btnEdit'] });
});

module.exports = router;

