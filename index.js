require('dotenv').config()
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL ;
const PORT = process.env.PORT || 5001 ;
const User = require('./models/User')
app.use(cookieParser());
app.use(express.json());


mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to database!')
});


const userInput = {
    username: 'sdfdsf',
    password: 'dslfolfgnjsdg',
    role: 'admin'
}

const user = new User(userInput);
user.save((err, document) => {
    if(err) console.log(err)
    console.log(document )
})


app.listen(PORT, () => {
    console.log(`Express server runing on ${PORT}`)
})