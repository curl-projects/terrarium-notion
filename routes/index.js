var express = require('express');
var router = express.Router();
var addPage = require('../functions/add-page-to-db');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const pageResponse = await addPage("New! Bug with Whiteboard Loading Quickly")
  console.log("PAGE RESPONSE:", pageResponse)
  res.send(pageResponse);
});

module.exports = router;
