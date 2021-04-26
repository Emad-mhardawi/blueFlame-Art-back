const Portrait = require("../models/PortraitModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Order = require('../models/orderModel');
const stripe = require('stripe')('sk_test_51I9YoTK3puAHTtgAWToSKzbIIXJeQ44hLg3GdFQUBJ78cS7ErbDOKJgq5dBFPjkK8Ib8FhS9XXc4lavXKkLa6vzI004BqRp0Ew');
const calculateOrderPrice = require('../utils/calculatePrice');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// asyncHandler is Simple middleware for handling exceptions inside of async express routes
//and passing them to the express error handlers.

// @ route: POST/  /login
//@ description: Auth user & get JWT
//@ access: public






exports.getCheckoutSession = asyncHandler(async (req, res, next)=>{
//// 1- get order data 
const {portraitName, portraitStyle, fullBody, portraitSize,commentsToArtist } = req.body;
 const image = req.file;
 if(!portraitStyle){
     res.status(500);
     throw new Error('portraitStyle is required')
 }

 if(!portraitSize){
    res.status(500);
    throw new Error('portraitSize is required')
}

const order = await new Order({
    user: req.user._id,
    portraitName:portraitName,
    portraitStyle:portraitStyle,
    portraitSize:portraitSize,
    fullBody:fullBody,
    commentsToArtist:commentsToArtist,
    imageUrl: image.path,
})



//// calculate order price
const price = await calculateOrderPrice(portraitStyle, portraitSize, fullBody)



//// 2- create checkout session
const session = await stripe.checkout.sessions.create({
payment_method_types: ['card'],
success_url: `http://localhost:3000/order`,
cancel_url: 'http://localhost:3000/checkout?canceled=true',
customer_email: req.user.email,
client_reference_id: order._id.toString(),//req.params.orderId,
line_items:[
    {
        name: req.body.portraitStyle,
        images:[`https://i.pinimg.com/originals/48/5e/85/485e85b9fc23985d94044d256c5f432c.jpg`],
        amount: price * 100, /// replace late 
        currency: 'usd', 
        quantity:1,
     
    }
],

})
/// 3- send session as a response to redirect user to stripe checkout page
console.log(session)
res.status(200).send(session)
})

/*
exports.createOrderCheckout = asyncHandler(async (req, res, next)=>{
   
   const {user, portraitStyle, portraitSize, portraitName, imageUrl, price} = req.body
    console.log(req.body)

    const order = await  Order.create({
        user: mongoose.Types.ObjectId(user),
        portraitName:portraitName,
        portraitStyle:portraitStyle,
        portraitSize:portraitSize,
        fullBody:fullBody,
        commentsToArtist:commentsToArtist,
        imageUrl: imageUrl,
        price:price
    })

    if(order){
        console.log('yeeeeeeees')
        res.send(order)
    }
    

    
    })*/





    const fulfillOrder = async (session) => {
        // TODO: fill me in
        console.log("Fulfilling order", session);
      }

    const webhooksecret = 'whsec_Tn1KdslOrJ4LiYu4MVwHLQvdrE2ub3sB';
    exports.webhookCheckout = asyncHandler(async (req, res)=>{
        const payload = request.body;
        const signature = req.headers['stripe-signature'];
        console.log('1115555555')
        let event;
        try{
            event = stripe.webhooks.constructEvent(payload,signature, webhooksecret)
        } catch(err){
            console.log('11111111sss')
            return res.status(400).send(`Webhook Error: ${err.message}`);
            
        }

          // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('11111111111111')
        // Fulfill the purchase...
        fulfillOrder(session);
        
  }
        
        res.status(200).json({received: true});

    })
         












/*

const YOUR_DOMAIN = 'http://localhost:3000';
exports.newOrder = asyncHandler(async (req, res, next) => {
 const {portraitName, portraitStyle, fullBody, portraitSize,commentsToArtist } = req.body;
 const image = req.file;
 
 if(!portraitStyle){
     res.status(500);
     throw new Error('portraitStyle is required');
 }

 if(!portraitSize){
    res.status(500);
    throw new Error('portraitSize is required');
}

const order = await  Order.create({
    user : req.user._id,
    portraitName: portraitName,
    portraitStyle:portraitStyle,
    portraitSize:portraitSize,
    fullBody:fullBody,
    commentsToArtist:commentsToArtist,
    imageUrl: image.path
})

*/