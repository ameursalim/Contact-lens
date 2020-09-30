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
      // This will be handled, by the eraseSessionMessage middelware in app.js
      req.session.msg = { status: 401, text: "Invalid credentials" };
      /**  Same could be done using the flash middleware **/ 
      // req.flash("error", "Invalid credentials");  // If you wanted to use flash you could aswell, you would have to handle i
      return res.redirect("/signin");
    }
    if (!bcrypt.compareSync(password, foundUser.password)) {
      // req.flash("error", "Invalid credentials");
      req.session.msg = { status: 401, text: "Invalid credentials" };
      return res.render("/");
    }
    req.session.currentUser = foundUser;
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
        // req.flash("error", "Email already taken");
        req.session.msg = { status: 401, text: "Email already taken." };
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