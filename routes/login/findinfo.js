const express = require('express');
const router = express.Router();

/* GET page. */
router.get('/', (req, res) => {
  res.render('login/findinfo');
});

module.exports = router;