let db = require('../models/');

var exports = module.exports = {}

exports.findAll = function(req, res) {
	db.Note.find({})
    .then(function(dbNote) {
      // If all article are successfully found, send them back to the client
      res.json({result: dbNote});
    })
    .catch(err => {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.findOne = function(req, res) {
	db.Note.find({
      _id: req.params.id
    })
    .then(function(dbNote) {
      // If all article are successfully found, send them back to the client
      res.json({result: dbNote});
    })
    .catch(err => {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.create = function(req, res) {
    db.Note.create(req.body)
    .then(dbNote => {
      return db.Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(dbHeadline => {
      // If the Article was updated successfully, send it back to the client
      res.json({result: dbHeadline});
    })
    .catch(err => {
      // If an error occurs, send it back to the client
      res.json(err);
    });
}

exports.delete = function(req, res) {
	db.Note.findByIdAndRemove({
		_id: req.params.noteid
	}).then(dbNote => {
		return db.Headline.findOneAndUpdate({
			_id: req.params.id
		}, {
			$pull: {
				note: dbNote._id
			}
		})
		.catch(err => {
			res.json(err);
		});
	});
}
