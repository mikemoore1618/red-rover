const
    express = require('express'),
    passport = require('passport'),
    apiRouter = new express.Router(),
    axios = require('axios'),
    apiCont = require('../controllers/api.js')

apiRouter.get('/', apiCont.index)
apiRouter.get('/:id', apiCont.show)

module.exports = apiRouter