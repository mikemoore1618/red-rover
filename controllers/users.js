const User = require('../models/User.js')

module.exports = {

// SHOW ALL USERS
    index: (req, res) => {
      User.find({}, (err, allUsers) => {
        if(err) throw err;
        res.json(allUsers)
      })  
    },

// SHOW USER
show: (req, res) => {
    let id = req.params.id
      User.findById(id, (err, showUser) => {
        if(err) throw err;
        res.json({ success: true, message: "USER FOUND", User: showUser })
      })
    },

// CREATE USER
    create: (req, res) => {
        User.create(req.body, (err, savedUser) => {
         if(err) throw err;
         res.json({ success: true, message: "USER CREATED", User: savedUser })
           })
       },

// EDIT USER
    update: (req,res) => {
        let id = req.params.id
        User.findById(id, (err, updateUser) => {
          if(err) throw err;
          updateUser.save((err, savedUser) => {
            if(err) throw err;
            res.json({ success: true, message: "USER UPDATED", User: savedUser})
          })
        })
    },
     
// DELETE USER
    destroy: (req, res) => {
        let id = req.params.id
        User.findByIdAndRemove(id, (err, deletedUser) => {
          if(err) throw err;
          res.json({ success: true, message: "USER DELETED" })
        })
    }
}