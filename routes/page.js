var express = require('express');
var router = express.Router();
var addPage = require('../functions/add-page');

router.post('/create', async function(req, res, next) {
  console.log(req)
  const body = req.body
  console.log("BODY:", body)
  const pageResponse = await addPage(body.thread, body.messages)
  res.send(pageResponse);
});


module.exports = router;
