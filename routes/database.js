var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
  res.send("Database Placeholder");
});


module.exports = router;
