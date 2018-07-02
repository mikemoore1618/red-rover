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

// create a new User
    create: (req, res) => {
        User.create(req.body, (err, savedUser) => {
         if(err) throw err;
         res.json({ success: true, message: "User created.", User: savedUser })
           })
       },
//update a User
    update: (req,res) => {
        let id = req.params.id
        User.findById(id, (err, UserItem) => {
          if(err) throw err;
          UserItem.save((err, savedUser) => {
            if(err) throw err;
            res.json({ success: true, message: "User Updated", User: savedUser})
          })
        })
    },
     
// delete a User
    destroy: (req, res) => {
        let id = req.params.id
        User.findByIdAndRemove(id, (err, deletedUser) => {
          if(err) throw err;
          res.json({ success: true, message: "User deleted." })
        })
    }
}