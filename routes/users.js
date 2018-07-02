const
    express = require('express'),
    passport = require('passport'),
    usersRouter = express.Router()

// LOGIN ROUTES & Will render login view
usersRouter.get('/login', (req, res) => {
    res.render('login')
})

usersRouter.post('/login', passport.authenticate('local-login', {
    succesRedirect: '/users/profile',
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
    res.render('signup')
})

usersRouter.post('/signup', passport.authenticate('local-signup', {
    succesRedirect: 'users/profile',
    failureRedirect: '/users/signup'
}))

usersRouter.get('/profile', isLoggedIn, (req,res) => {
    // Render the Users profile only if user is logged in
    Post.find({ _by: req.user._id }, (err, userPosts) => {
    })
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