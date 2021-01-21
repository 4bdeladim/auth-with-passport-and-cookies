require('dotenv').config()
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL ;
const PORT = process.env.PORT || 5001 ;
const User = require('./models/User');
const userRouter = require('./routes/User')
app.use(cookieParser());
app.use(express.json());
app.use('/user', userRouter)

mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to database!')
});



app.listen(PORT, () => {
    console.log(`Express server runing on ${PORT}`)
})