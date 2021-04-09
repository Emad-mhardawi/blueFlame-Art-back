const express = require('express');

const app = express()

app.use((req,res, next)=>{
res.send('helllo')
})


app.listen(5000, console.log('working fine'))