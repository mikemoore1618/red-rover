const User = require('../models/User.js')

module.exports = {
    //retrieve all Users
    index: (req, res) => {
      User.find({}, (err, allUsers) => {
        if(err) throw err;
        res.json(allUsers)
      })  
    },
// show a User
show: (req, res) => {
    let id = req.params.id
      User.findById(id, (err, showUser) => {
        if(err) throw err;
        res.json({ success: true, message: "User found", User: showUser })
      })
    },
}