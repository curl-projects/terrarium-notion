var express = require('express');
var router = express.Router();
var addPage = require('../functions/add-page-to-db');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
