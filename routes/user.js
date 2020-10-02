var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Lens = require('../models/Lens')
const fileUploader = require('../config/cloudinary.js');
const protectedUserRoute = require('../middlewares/protectedUserRoute')
/* GET users listing. */
router.get('/profile/:id', protectedUserRoute, async function(req, res, next) {
  try {
    const user = await User.findOne({username:req.session.currentUser.username})
    res.render('user/profile', { user, js: ['btnEdit', 'displayPlaceholder'] });
  } catch (error) {
    console.error(error)
  }
});

router.get('/orders/:id', protectedUserRoute, async function(req, res, next) {
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
        js: [
          'btnEdit',
          'imgPreview'
        ] 
      });
  } catch (error) {
    console.error(error)
  }
});

router.post('/edit/:id', protectedUserRoute, fileUploader.single('ordonnance'), async (req, res, next) => {
 
  try {
    const newProperties = req.body
    const previousPage = req.headers.referer.split('/')
    const backToPage = previousPage[previousPage.length -2].slice(-1) === 's' ? 'orders' : 'profile'

    newProperties['info.mutuelle'] = req.body.mutuelle

    if (req.file) newProperties['info.ordonnance'] = req.file.path

    const user = await User.findByIdAndUpdate(req.params.id, newProperties)
    res.redirect(`/admin/${backToPage}/${req.params.id}`)
  } catch (error) {
    console.error(error)
  }

})

router.get('/delete/:id', protectedUserRoute, async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.redirect('/auth/logout')
  } catch (error) {
    console.error(error)
  }
})


module.exports = router;

