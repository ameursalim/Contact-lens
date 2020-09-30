const express = require("express");
const Lens = require("../models/Lens");
const router = express.Router();

router.get("/clients", async (req, res, next) => {
	res.render("admin/clients");
  });


router.get("/lenses", async(req, res, next) => {
  try {
    const lenses = await Lens.find();
    console.log(lenses)
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
    console.log(req.body);
  try {
    const newLens = req.body;
    const createNewLens = await Lens.create(newLens);
    res.redirect("/admin/lenses");
  } catch (error) {
    next(error);
  }
});



router.get("/editProduct", async (req, res, next) => {
  res.render("admin/editProduct");
});


module.exports = router;