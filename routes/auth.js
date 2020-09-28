const express = require("express");
const router = express.Router();



router.get("/signin", async (req, res, next) => {
  res.render("auth/signin.hbs");
});

router.get("/signup", async (req, res, next) => {
    res.render("auth/signup.hbs");
  });
  

module.exports = router;