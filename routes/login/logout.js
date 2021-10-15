const express = require("express");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

router.get("/", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
