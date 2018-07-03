const
    express = require('express'),
    passport = require('passport'),
    sitesRouter = new express.Router(),
    axios = require('axios'),
    siteCont = require('../controllers/sites.js')

sitesRouter.get('/', siteCont.index)
sitesRouter.get('/new', siteCont.newSite)
sitesRouter.get('/edit', siteCont.editSite)
sitesRouter.get('/:id', siteCont.show)
sitesRouter.post('/', siteCont.create)
sitesRouter.patch('/:id', siteCont.update)
sitesRouter.delete('/:id', siteCont.destroy)
sitesRouter.post('/', isLoggedIn, siteCont.create)

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

module.exports = sitesRouter