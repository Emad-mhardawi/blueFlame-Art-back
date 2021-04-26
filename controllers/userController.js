const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken= require('../utils/generateToken')
const bcrypt = require("bcrypt");

// asyncHandler is Simple middleware for handling exceptions inside of async express routes
//and passing them to the express error handlers.

// @ route: POST/  /login
//@ description: Auth user & get JWT
//@ access: public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user){
      res.status(404);
      throw new Error('no account is attached with this email');
  }

  //check if the provided password match the password in the database
  //since the password is hashed, compare them with compare method bcrypt
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (user && passwordMatch) {
    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});


// @ route: GET/  /profile
//@ description: get user profile data
//@ access: Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId);

    
    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404);
        throw new Error('user not found')
    }
  
    console.log(req.user)
  });
  
 

  // @ route: POST/  /profile
//@ description: register new user 
//@ access: public
exports.postRegisterUser = asyncHandler( async(req, res, next)=>{
let {username, email, password, confirmedPassword} = req.body;

if(!email ){
    res.status(400)
    throw new Error('email is required');
}

if(!password  || password.length < 6){
    res.status(400)
    throw new Error('password is required and have to be at least 6 characters long');
}

if(password !== confirmedPassword ){
    res.status(400)
    throw new Error('password dose not match');
}

if(!username){
    username = email;
}


const userExist = await User.findOne({email:email})

if(userExist){
    res.status(400);
    throw new Error('user already exsits')
}

const hashedPassword = (await bcrypt.hash(password, 12)).toString()

const user = await User.create({username:username, email:email, password:hashedPassword })

if(user){
res.status(201).json({
    username: user.username,
})
}else{
    res.status(400);
    throw new Error('invalid user data, something went wrong')
}

})