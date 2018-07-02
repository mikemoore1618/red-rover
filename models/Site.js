const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    name: String,
    body: String,
    photo: String,
    _by: { ref: "User", type: mongoose.Schema.Types.ObjectId}
})

const Site = mongoose.model('Site', siteSchema)
module.exports = Site