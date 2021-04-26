const Portrait = require("../models/PortraitModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// asyncHandler is Simple middleware for handling exceptions inside of async express routes
//and passing them to the express error handlers.

// @ route: POST/  /login
//@ description: Auth user & get JWT
//@ access: public
exports.addPortrait = asyncHandler(async (req, res, next) => {
  const { portraitStyle, description, price } = req.body;

  const portriat = await Portrait.create({ portraitStyle,description,price });
  if(portriat){
      res.send(portriat) 
  }

});

exports.getPortraits = asyncHandler(async (req, res, next) => {
    const portriats = await Portrait.find({});
    if(portriats){
        res.send(portriats) 
    }
  
  });
  
