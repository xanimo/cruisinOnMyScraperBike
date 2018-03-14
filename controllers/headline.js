let db = require('../models/');

var exports = module.exports = {}

exports.index = function(req, res) {
	res.render('home');
}

exports.saved = function(req, res) {
	res.render('saved');
}

exports.findAll = function(req, res) {
	db.Headline.find({})
    .then(function(dbHeadline) {
      // If all article are successfully found, send them back to the client
      res.render("home", {result: dbHeadline});
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.findAllJson = function(req, res) {
	db.Headline.find({})
    .then(function(dbHeadline) {
      // If all article are successfully found, send them back to the client
      res.json({result: dbHeadline});
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.findOne = function(req, res) {
    db.Headline.findOne({
      _id: req.params.id
    })
    .populate("note")
    .then(function(dbHeadline) {
      // If all Users are successfully found, send them back to the client
      res.render("view", {result: dbHeadline});
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.findOneJson = function(req, res) {
    db.Headline.findOne({
      _id: req.params.id
    })
    .populate("note")
    .then(function(dbHeadline) {
      // If all Users are successfully found, send them back to the client
      res.json({result: dbHeadline});
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.delete = function(req, res) {
	db.Headline.findByIdAndRemove({
		_id: req.params.id
	}).then(function(dbHeadline) {
		res.json(dbHeadline)
	})
	.catch(function(err) {
			res.json(err);
		});
}
