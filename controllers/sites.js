const Site = require('../models/Site.js')

module.exports = {

  // SHOW ALL SITESS
  index: (req, res) => {
    Site.find({}, (err, allSites) => {
      if (err) throw err;
      res.render('index')
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
  newSite: (req, res) => {
    console.log('hit')
    res.render('sites/new')
  },

  create: (req, res) => {
    Site.create({ ...req.body, _by: req.user }, (err, savedSite) => {
      if (err) throw err;
      res.json({ success: true, message: "SITE CREATED", Site: savedSite })
    })
  },

  // EDIT SITES
  editSite: (req, res) => {
    res.render('sites/editSite')
  },

  update: (req, res) => {
    let id = req.params.id
    Site.findByIdAndUpdate(id, { $set: req.body }, (err, updateSite) => {
      if (err) throw err;
      updateSite.save((err, savedSite) => {
        if (err) throw err;
        res.redirect('/sites')
      })
    })
  },

  // DELETE SITES
  destroy: (req, res) => {
    let { id } = req.params
    Site.findByIdAndRemove(id, (err, deletedSite) => {
      if (err) throw err;
      res.json({ success: true, message: "SITE DELETED" })
    })
  }
}