var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Lens = require('../models/Lens')

/* GET users listing. */
router.get('/profile', async function(req, res, next) {
  const user = await User.findOne({username:req.session.currentUser.username})
  
  res.render('user/profile', { user, js: ['btnEdit'] });
});

router.get('/orders', async function(req, res, next) {
  const user = await User.findOne({ username:req.session.currentUser.username }).populate("info.id_ContactLens") 
  const lenses = await Lens.find()
  const frequency = [
    'daily',
    'weekly',
    'monthly'
  ]

  res.render(
    'user/orders', 
    { 
      user, 
      lenses, 
      frequency, 
      js: ['btnEdit'] 
    });
});


router.post('/edit/:id', async (req, res, next) => {
  console.log(req.params.id, req.body)
  const user = await User.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/user/profile')
})

module.exports = router;

