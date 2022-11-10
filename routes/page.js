var express = require('express');
var router = express.Router();
var addPage = require('../functions/add-page');

router.post('/create', async function(req, res, next) {
  try{
    const body = req.body
    const pageResponse = await addPage(body.thread, body.messages)
    res.status(200).json({data: pageResponse}).send()
  }
  catch(error){
    console.log("ERROR MESSAGE", error.message)
    console.log("ERROR CAUSE", error.cause.message)
    if(error.cause && error.cause.message === "NoAnchor"){
      res.status(400).json({message: "NoAnchor"}).send()
    }
    else if(error.cause && error.cause.message === "MultipleDB"){
      res.status(400).json({message: "MultipleDB"}).send()
    }
    else if(error.cause && error.cause.message === "AxiosRequestError"){
      res.status(400).json({message: "AxiosRequestError"}).send()
    }
    else if(error.message === "AddPageError"){
      console.error("Unidentified Add Page Error:", error.cause.message)
      res.status(400).json({message: "AddPageError"}).send()
    }
    else{
      res.status(400).json({message: "UnspecifiedError"}).send()
    }
  }
});


module.exports = router;
