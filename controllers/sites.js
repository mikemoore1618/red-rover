const Site = require('../models/Site.js')
const _ = require('underscore');

module.exports = {

  // SHOW ALL SITESS
  index: (req, res) => {
    Site.find({}, (err, allSites) => {
      if (err) throw err;
      let chunkedSites = _.chunk(allSites, 4);
      console.log(chunkedSites)
      res.render('index', {Sites: chunkedSites})
    })
  },

  // SHOW CURRENT SITES
  show: (req, res) => {
    let id = req.params.id
    Site.findById(id, (err, showSite) => {
      if (err) throw err;
      res.render('sites/show', { Site: showSite })
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
      res.redirect('/sites')
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
      res.redirect('/sites')
    })
  }
}