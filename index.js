const express = require('express');
const connectDb = require('./config/db');
const authRoute = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
require('dotenv').config()


const app = express()


app.use(express.json());
app.use(authRoute);
app.use(userRoutes);

app.use('/',(req,res, next)=>{
res.send('helllo')
})


app.use(notFound)

app.use(errorHandler)

connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}` ))