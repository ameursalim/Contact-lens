var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Lens = require('../models/Lens')

/* GET users listing. */
router.get('/profile', async function(req, res, next) {
  try {
    const user = await User.findOne({username:req.session.currentUser.username})
    res.render('user/profile', { user, js: ['btnEdit'] });
  } catch (error) {
    console.error(error)
  }
});

router.get('/orders', async function(req, res, next) {
  try {
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
  } catch (error) {
    console.error(error)
  }
});


router.post('/edit/:id', async (req, res, next) => {
  
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/user/profile')
  } catch (error) {
    console.error(error)
  }

})

router.get('/delete/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.redirect('/auth/signup')
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;

