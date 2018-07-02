const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs')
  userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  })

// allows user to goenerate a hashed password
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password)
}

// return's true when correct password
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

userSchema.pre(`save`, function(next){
  if(this.isModified('password')) {
    this.password = this.generateHash(this.password)
  }
  console.log("saving to database")
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User