let db = require('../models/');

var exports = module.exports = {}

exports.index = function(req, res) {
	res.render('home');
}

exports.saved = function(req, res) {
	res.render('saved');
	// db.Headline.find({saved:true})
 //    .then(function(dbHeadline) {
 //    	console.log(dbHeadline.saved);
 //      // If all article are successfully found, send them back to the client
 //      res.render("saved", {result: dbHeadline});
 //    })
 //    .catch(function(err) {
 //      // If an error occurs, send the error back to the client
 //      res.json(err);
 //    });
}

exports.savedJson = function(req, res) {
	db.Headline.find({saved:true})
	.populate("note")
    .then(function(dbHeadline) {
    	console.log(dbHeadline.saved);
      // If all article are successfully found, send them back to the client
      res.json({result: dbHeadline});
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.findAll = function(req, res) {
	db.Headline.find({saved:false})
    .then(function(dbHeadline) {
    	console.log(dbHeadline.saved);
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
    	console.log(dbHeadline)
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
    if (dbHeadline) {
      // If all Users are successfully found, send them back to the client
      res.json({result: dbHeadline});
  } else {
  	res.redirect('/headlines');
  }
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.create = function(req, res) {
	db.Headline.findOneAndUpdate({
	 _id: req.params.id }, 
	 { saved: true })
    .then(function(dbHeadline) {
      // If the Article was updated successfully, send it back to the client
      res.json({result: dbHeadline});
      console.log(dbHeadline);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
}

exports.update = function(req, res) {
	db.Headline.findOneAndUpdate({
	 _id: req.params.id },
	 { saved: req.params.saved })
    .then(function(dbHeadline) {
      // If the Article was updated successfully, send it back to the client
      res.json({result: dbHeadline});
      console.log(dbHeadline);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
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
