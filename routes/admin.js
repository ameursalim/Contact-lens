const express = require("express");
const Lens = require("../models/Lens");
const User = require("../models/User");
const router = express.Router();




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

router.post("/addProduct", async (req, res, next) => {
    // console.log(req.body);
  try {
    const newLens = req.body;
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
  router.post("/editProduct/:id",  async (req, res, next) => {
    try {
      const LensesrId = req.params.id;
      // console.log(LensesrId)
      const lens=  await Lens.findByIdAndUpdate(LensesrId,req.body,{ new: true });
  
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