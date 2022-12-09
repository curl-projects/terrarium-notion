var express = require('express');
var router = express.Router();

var addRoadmap = require('../functions/add-roadmap');

route.post('/create', async function(req, res, next){
  try {
    const body = req.body
    const roadmapResponse = await addRoadmap(body.notionAuth, body.featureName)
  }
  catch (error){
    console.log("ERROR MESSAGE", error.message)
    console.log("ERROR CAUSE", error.cause.message)
  }
})
