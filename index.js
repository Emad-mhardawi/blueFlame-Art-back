const express = require('express');
const connectDb = require('./config/db');
const cors =require('cors');
const authRoute = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const portraitRoutes = require('./routes/portraitRoute');
const orderRoutes = require('./routes/orderRoutes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const ordersController = require('./controllers/ordersController');

const multer = require('multer');
const stripe = require('stripe')('sk_test_51I9YoTK3puAHTtgAWToSKzbIIXJeQ44hLg3GdFQUBJ78cS7ErbDOKJgq5dBFPjkK8Ib8FhS9XXc4lavXKkLa6vzI004BqRp0Ew');
require('dotenv').config()
const bodyParser = require('body-parser')

const app = express();
app.use(cors())

app.use('/images',express.static('images'))

////configure storage for uploaded images to use with multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images')
    },
    filename: (req, file, cb)=>{
        cb(null, req.body.portraitStyle + '-' + file.originalname)
    }
});


const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/png'  || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
    
    
}
//// stripe needs the body coming with the request to be in a row format
//// so this route should be here before body parsed into a json format 
app.post('/webhook-checkout', bodyParser.raw({type:'application/json'}), ordersController.webhookCheckout);
app.use(express.json());
app.use(multer({storage:fileStorage, fileFilter:fileFilter }).single('image'))

app.use(authRoute);
app.use(userRoutes);
app.use(portraitRoutes);
app.use(orderRoutes);



app.use(notFound)
 
app.use(errorHandler)

connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}` ))