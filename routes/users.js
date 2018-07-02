const
    express = require('express'),
    passport = require('passport'),
    usersRouter = express.Router()

// LOGIN ROUTES
usersRouter.get('/login', (req, res) => {
    res.render('login')
})

usersRouter.post('/login', passport.authenticate('local-login', {
    succesRedirect: '/users/profile',
    failureRedirect: '/users/login'
}))

// SIGN UP ROUTES
usersRouter.get('/signup', (req, res) => {
    res.render('signup')
})

usersRouter.post('/signup', passport.authenticate('local-signup', {
    succesRedirect: 'users/profile',
    failureRedirect: '/users/signup'
}))

usersRouter.get('/profile', isLoggedIn, (req,res) => {
    // Render the Users profile only if user is logged in 
    res.render('profile', { user: req.user })
})

usersRouter.get('/logout', (req, res) => {
    // Destroy the session, and redirect the user back to the home page
    req.logout()
    res.redirect('/')
})

// A method used to authorize a user BEFORE allowing them to proceed to the user profile page:
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

module.exports = usersRouter