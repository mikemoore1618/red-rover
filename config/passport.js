const
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')

passport.serializeUser((user, done) => {
    done(null, user._id)
})

// Create unique session out 0f the l0gged in users ID
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

// LOCAL SIGNUP STRATEGY
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if(err) return done(err)
        if(user) return done(null, false, req.flash('signupMessage', 'That email is already taken'));
        User.create(req.body, (err, newUser) => {
            if(err) return console.log(err)
            return done(null, newUser, null)
        })
    })
    // User.create(req.body, (err, newUser) => {
    //     if(err) return done(err);
    //     console.log(newUser)
    //     return done(null, newUser);
    // })
}))

// LOCAL LOGIN
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if(err) return done(err)
        if(!user || !user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'The email or password is incorrect'))
        return done(null, user, req.flash('returnMessage', `Welcome back ${user.name}!`))
    })
}))

module.exports = passport