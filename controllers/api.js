const Site = require('../models/Site.js')

module.exports = {

  // SHOW ALL SITESS
  index: (req, res) => {
    Site.find({}, (err, allSites) => {
      if (err) throw err;
      res.json({status: "Success", payload: allSites})
    })
  },

  // SHOW CURRENT SITES
  show: (req, res) => {
    let id = req.params.id
    Site.findById(id, (err, showSite) => {
      if (err) throw err;
      res.json({status: "Success", payload: showSite})
    })
  }
}