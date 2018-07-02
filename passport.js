//////////// Necessary packages /////////////////
///////////// Add to server.js /////////////////
//-------------------------------------------//


const
    express = require('express'),
    app = express(),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    session = require('express session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    passport = require('passport'),
    passportConfig = require('./config/passport.js'),
    usersRouter = require('./routes/users.js')


/////// Environment port ///////
const
    port = process.env.PORT || 3000,
    mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/passport-authentication'

///// Mongoose connection //////////
mongoose.connect(mongoConnectionString, (err) => {
    console.log(err || 'Connected to MongoDB (passport-authentication)')
})

////////// Stores session information as a 'sessions' collection in Mongo
const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
})

//////// Middleware ////////////
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(flash())

/////////// ejs configuration ////////////
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use('/users', usersRouter)

// Session + Passport
app.use(session({
    secret: 'asstastic',
    cookie:{maxAge : 60000000},
    resave: true,
    saveUninitialized: false,
    store: store
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    app.locals.currentUser = req.userapp.locals.loggedIn = !!req.user

    next()
})

//// ROOT ROUTE //////
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, (err) => {
    console.log(err || `Server running on ${PORT}`)
})

/////////////// ADD TO MODEL User.js ///////////////////
//---------------------------------------------//

const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-node.js'),
    userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
    })

userSchema.methods.generateHash = function(password){
    return bycrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function(password){
    return bycrypt.compareSync(password, this.password)
}

userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = this.generateHash(this.password)
    }
    next()
})

module.exports = mongoose.model('User', userSchema)

///////////// ADD TO ROUTER /routes/users.js /////////////
// --------------------- -----------------------//

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


/////////////////// ADD TO CONFIG
 passport.js ///////////////////
//-----------------------------------------------------//

const
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')

passport.serializeUser((user, done) => {
    done(null, user.id)
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
    User,findOne({ email: email }, (err, user) => {
        if(err) return done(err)
        if(user) return done(null, false)
        User.create(req.body, (err, newUser) => {
            if(err) return console.log(err)
            return done(null, newUser, null)
        })
    })
}))

// LOCAL LOGIN
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if(err) return done(err)
        if(!user || !user.validPassword(password)) return done(null, false)
        return done(null, user)
    })
}))

module.exports = passport