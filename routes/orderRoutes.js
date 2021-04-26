const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const protect = require('../middleware/authMiddleware');


 


router.post('/checkout-session' , protect, ordersController.getCheckoutSession)
//router.post('/postneworder' , ordersController.createOrderCheckout)
//router.post('/neworder', protect ,ordersController.newOrder);
//router.post('/webhook' ,ordersController.webhook);



module.exports = router;