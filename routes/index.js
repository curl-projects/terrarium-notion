var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/create-db', function(req, res, next) {
  res.send('placeholder');
});

module.exports = router;
