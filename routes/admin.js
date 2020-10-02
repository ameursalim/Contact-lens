const express = require("express");
const Lens = require("../models/Lens");
const User = require("../models/User");
const router = express.Router();
const fileUploader = require('../config/cloudinary.js');
const protectedAdminRoute = require('../middlewares/protectedAdminRoute')




  // create lenses

router.get("/lenses", protectedAdminRoute, async(req, res, next) => {
  try {
    const lenses = await Lens.find();
    // console.log(lenses)
    res.render("admin/lenses", {lenses});
  }
  catch(error) {
    next(error);
  }
});

router.get("/addProduct", protectedAdminRoute, async (req, res, next) => {
  try{
  const lenses = await Lens.find();
  
  res.render("admin/addProduct", {
    lenses: lenses,
    js:['displayPlaceholderLens']
  });
} catch (error) {
  next(error);
}

});

router.post("/addProduct", protectedAdminRoute, fileUploader.single('img'), async (req, res, next) => {
  try {

    const newLens = req.body;
    newLens.img = req.file ? req.file.path : 'https://64.media.tumblr.com/16e0376edae2174fc3814afd6f29c6ee/tumblr_inline_o5j7t4Kg8N1sv6mvi_500.jpg'
    const createNewLens = await Lens.create(newLens);
    res.redirect("/admin/lenses");
  } catch (error) {
    next(error);
  }
});

// ----------------------DELETE PRODUCT -------------------------




  router.get("/delete/:id", protectedAdminRoute, async (req, res, next) => {
    try {
      const LensesrId = req.params.id;
      await Lens.findByIdAndDelete(LensesrId);
      res.redirect("/admin/lenses");
    } catch (error) {
      next(error);
    }
  });

// -----------updtate-------

  router.get("/editProduct/:id",  protectedAdminRoute, async (req, res, next) => {
    try {
      const LensesrId = req.params.id;
      // console.log(LensesrId)
      const lens=  await Lens.findById(LensesrId,req.body);
  
      res.render("admin/editProduct",{lens});
    } catch (error) {
      next(error);
    }
  });

  router.post("/editProduct/:id", protectedAdminRoute, fileUploader.single('img'), async (req, res, next) => {
    try {
      const LensesId = req.params.id;
      // console.log(LensesrId)
      const upToDataLens = req.body
      if (req.file) upToDataLens.img = req.file.path
      await Lens.findByIdAndUpdate(LensesId,upToDataLens,{ new: true });
  
      res.redirect("/admin/lenses");
    } catch (error) {
      next(error);
    }
  });

//---------------add profile of all clients--------------

  router.get("/clients", protectedAdminRoute, async (req, res, next) => {
   
    try {
      const user=  await User.find();

      res.render("admin/clients",{user});
    } catch (error) {
      next(error);
    }

  });

    router.post('/edit/:id', protectedAdminRoute, fileUploader.single('ordonnance'), async (req, res, next) => {
 
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

//_______ RENDER PROFIL AND ORDERS --------)

router.get('/profile/:id', async function(req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    res.render('user/profile', { user, js: ['btnEdit', 'displayPlaceholder'] });
  } catch (error) {
    console.error(error)
  }
});

router.get('/deleteU/:id', protectedAdminRoute, async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.redirect('/admin/clients')
  } catch (error) {
    console.error(error)
  }
})

router.get('/orders/:id', async function(req, res, next) {
  try {
    const user = await User.findById( req.params.id ).populate("info.id_ContactLens") 
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




module.exports = router;