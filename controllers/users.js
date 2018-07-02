const User = require('../models/User.js')

module.exports = {
    //retrieve all Users
    index: (req, res) => {
      User.find({}, (err, allUsers) => {
        if(err) throw err;
        res.json(allUsers)
      })  
    },

}