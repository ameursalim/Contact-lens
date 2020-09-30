const express = require("express");
const Lens = require("../models/Lens");
const User = require("../models/User");
const router = express.Router();
const fileUploader = require('../config/cloudinary.js');




  // create lenses

router.get("/lenses", async(req, res, next) => {
  try {
    const lenses = await Lens.find();
    // console.log(lenses)
    res.render("admin/lenses", {lenses});
  }
  catch(error) {
    next(error);
  }
});

router.get("/addProduct", async (req, res, next) => {
  try{
  const lenses = await Lens.find();
  
  res.render("admin/addProduct", {
    lenses: lenses,
  });
} catch (error) {
  next(error);
}

});

router.post("/addProduct", fileUploader.single('img'), async (req, res, next) => {
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




  router.get("/delete/:id",  async (req, res, next) => {
    try {
      const LensesrId = req.params.id;
      await Lens.findByIdAndDelete(LensesrId);
      res.redirect("/admin/lenses");
    } catch (error) {
      next(error);
    }
  });

// -----------updtate-------

  router.get("/editProduct/:id",  async (req, res, next) => {
    try {
      const LensesrId = req.params.id;
      // console.log(LensesrId)
      const lens=  await Lens.findById(LensesrId,req.body);
  
      res.render("admin/editProduct",{lens});
    } catch (error) {
      next(error);
    }
  });

  router.post("/editProduct/:id", fileUploader.single('img'), async (req, res, next) => {
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

  router.get("/clients", async (req, res, next) => {
   
    try {
      const UserId = req.params.id;
      console.log(UserId)
      const user=  await User.find(UserId,req.body);
  
      res.render("admin/clients",{user});
    } catch (error) {
      next(error);
    }

    });







module.exports = router;