const
    express = require('express'),
    passport = require('passport'),
    sitesRouter = express.Router(),
    axios = require('axios')

sitesRouter.get('/:id', Site.show)
sitesRouter.get('/', Site.index)
sitesRouter.post('/', Site.create)


module.exports = sitesRouter