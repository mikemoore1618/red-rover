const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    name: String,
    body: String,
    photo: String,
    _by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

const Site = mongoose.model('Site', siteSchema)
module.exports = Site;