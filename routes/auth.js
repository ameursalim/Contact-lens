const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");



router.get("/signin", async (req, res, next) => {
  res.render("auth/signin");
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {

      req.flash("error", "Invalid credentials"); 
      return res.redirect("/auth/signin");

    }
    if (!bcrypt.compareSync(password, foundUser.password)) {
      req.flash("error", "Invalid credentials");
    
      return res.render("/auth/signin");
    }

    const userObj = foundUser.toObject()
    delete userObj.password
    req.session.currentUser = userObj;
    req.flash("success", "Successfully logged in...")
    res.redirect("/");

  } catch (err) {
    next(err);
  }
});

// signup

router.get("/signup", async (req, res, next) => {
    res.render("auth/signup");
  });
  
  router.post("/signup", async (req, res, next) => {
    const { username ,email, password } = req.body;
  
    try {
      const foundUser = await User.findOne({ email: email });
      if (foundUser) {
        req.flash("error", "Email already taken");
        return res.redirect("/auth/signup");
      }
      const salt = 10;
      const hashedPassword = bcrypt.hashSync(password, salt);
      await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  });



  router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  });

module.exports = router;