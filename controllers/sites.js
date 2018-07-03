const Site = require('../models/Site.js')

module.exports = {

  // SHOW ALL SITESS
  index: (req, res) => {
    Site.find({}, (err, allSites) => {
      if (err) throw err;
      res.json({ status: "SUCCESS", payload: allSites }  )
    })
  },

  // SHOW CURRENT SITES
  show: (req, res) => {
    let id = req.params.id
    Site.findById(id, (err, showSite) => {
      if (err) throw err;
      res.json({ success: true, message: " SITE FOUND", Site: showSite })
    })
  },

  // CREATE SITES
  new: (req, res) => {
    res.render('sites/new')
  },

  create: (req, res) => {
    Site.create({ ...req.body, _by: req.user }, (err, savedSite) => {
      if (err) throw err;
      res.json({ success: true, message: "SITE CREATED", Site: savedSite })
    })
  },

  // EDIT SITES
  update: (req, res) => {
    let id = req.params.id
    Site.findById(id, (err, updateSite) => {
      if (err) throw err;
      updateSite.save((err, savedSite) => {
        if (err) throw err;
        res.json({ success: true, message: "SITE UPDATED", Site: savedSite })
      })
    })
  },

  // DELETE SITES
  destroy: (req, res) => {
    let id = req.params.id
    Site.findByIdAndRemove(id, (err, deletedSite) => {
      if (err) throw err;
      res.json({ success: true, message: "SITE DELETED" })
    })
  }
}