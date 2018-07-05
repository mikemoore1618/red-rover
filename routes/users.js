const
    express = require('express'),
    passport = require('passport'),
    usersRouter = new express.Router(),
    Site = require('../models/Site.js')
    User = require('../models/User.js')

// LOGIN ROUTES & Will render login view
usersRouter.get('/login', (req, res) => {
    res.render('login', { message: req.flash('loginMessage') })
})

usersRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login'
}))

// Render Profile Edit View
usersRouter.get('/profile/edit', isLoggedIn, (req, res) => {
    res.render('editProfile')
})

usersRouter.patch('/profile', isLoggedIn, (req, res) => {
    if(!req.body.password) delete req.body.password
    Object.assign(req.user, req.body)
    req.user.save((err, updatedUser) => {
        if(err) return console.log(err)
        res.redirect('/users/profile')
    })
})

// SIGN UP ROUTES
usersRouter.get('/signup', (req, res) => {
    console.log('hit')
    res.render('signup', { message: req.flash('signupMessage') })
})

usersRouter.get('/profile', isLoggedIn, (req,res) => {
    // Render the Users profile only if user is logged in
    console.log('hit')
    User.find({ _by: req.user._id }, (err, userSites) => {
    })
    res.render('profile', { user: req.user, message: req.flash('returnMessage') })
})

usersRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup'
}))

usersRouter.get('/logout', (req, res) => {
    // Destroy the session, and redirect the user back to the home page
    req.logout()
    res.redirect('/')
})

usersRouter.delete('/', isLoggedIn, (req, res) => {
    console.log("hit")
    User.findOneAndDelete({ _id : req.user._id}, () => {
        res.redirect('/users/login')
    })
})

// A method used to authorize a user BEFORE allowing them to proceed to the user profile page:
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

module.exports = usersRouter