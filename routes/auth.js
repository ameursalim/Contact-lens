const express = require("express");
const router = express.Router();



router.get("/signin", async (req, res, next) => {
  res.render("auth/signin.hbs");
});

module.exports = router;