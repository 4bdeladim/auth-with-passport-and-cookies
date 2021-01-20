const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    todo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'todo'
        }
    ]
});


UserSchema.pre('save', function(next){
    if(!this.isModified('password')) return next() ;
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if(err) return next(err)
        this.password = hashedPassword ;
        next();
    })
});

UserSchema.methods.comparePssword = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatched) => {
        if(err) return cb(err)
        else if(!isMatched) return cb(null, isMatched)
        return cb(null, this)
    })
} 

module.exports = mongoose.model('User', UserSchema);