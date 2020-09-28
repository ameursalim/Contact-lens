const express = require("express");
const router = express.Router();

router.get("/clients", async (req, res, next) => {
	res.render("admin/clients");
  });

router.get("/lenses", async (req, res, next) => {
  res.render("admin/lenses");
});

module.exports = router;