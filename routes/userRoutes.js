const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
 



router.post('/login',userController.login);
router.post('/register', userController.postRegisterUser);
router.get('/profile', protect,  userController.getUserProfile);


module.exports = router;