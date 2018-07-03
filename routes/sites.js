const
    express = require('express'),
    passport = require('passport'),
    sitesRouter = new express.Router(),
    axios = require('axios'),
    siteCont = require('../controllers/sites.js')

sitesRouter.get('/', siteCont.index)
sitesRouter.get('/:id', siteCont.show)
sitesRouter.post('/', siteCont.create)


module.exports = sitesRouter