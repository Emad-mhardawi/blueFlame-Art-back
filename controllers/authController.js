const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');



// asyncHandler is Simple middleware for handling exceptions inside of async express routes
//and passing them to the express error handlers.


// @ route: GET/signup
//@ description: add new user
//@ access: public
exports.signup= asyncHandler( async (req, res, next)=>{
    const username = req.body.username;
    const email= req.body.email;
    const password = req.body.password;
    

    
    const hashedPassword = (await bcrypt.hash(password, 12)).toString();

    if(!email){
        res.status(500);
        throw new Error('please enter your email')
    }

    const newUser = await User.create({
        username:username,
        email:email,
        password:hashedPassword,
    })
    console.log(' new user ' + newUser)
    

}
) 


