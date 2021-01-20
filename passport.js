require('dotenv').config()
const passport = require('passport');
const LocalStratrgy = require('passport-local').Strategy ;
const User = require('./models/User');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = (req) => {
    let token = null ;
    if(req && req.cookies) token = req.cookies['access-token']
    return token 
}
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_KEY
}))

passport.use(new LocalStratrgy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        if(err) return done(err)
        if(!user) return done(null, false)
        user.comparePassword(password, done)
    })
}))
