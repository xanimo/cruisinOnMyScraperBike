let db = require('../models/');

var exports = module.exports = {}

exports.index = (req, res) => {
	res.render('home', { uid: req.user._id });
}

exports.saved = (req, res) => {
	res.render('saved', { user: req.session.passport.user });
	// db.Headline.find({saved:true})
 //    .then(dbHeadline => {
 //    	console.log(dbHeadline.saved);
 //      // If all article are successfully found, send them back to the client
 //      res.render("saved", {result: dbHeadline});
 //    })
 //    .catch(err => {
 //      // If an error occurs, send the error back to the client
 //      res.json(err);
 //    });
}

exports.savedJson = (req, res) => {
	db.Headline.find({saved:true})
	.populate("note")
    .then(dbHeadline => {
    	console.log(dbHeadline.saved);
      // If all article are successfully found, send them back to the client
      res.json({ result: dbHeadline });
    })
    .catch(err => {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}



exports.findAll = (req, res) => {
	db.Headline.find({saved:false})
    .then(dbHeadline => {
    	console.log(dbHeadline.saved);
      // If all article are successfully found, send them back to the client
      res.render("home", {result: dbHeadline, user: req.session.passport.user });
    })
    .catch(err => {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.findAllJson = (req, res) => {
	db.Headline.find({})
    .then(dbHeadline => {
    	console.log(dbHeadline)
      // If all article are successfully found, send them back to the client
      res.json({result: dbHeadline});
    })
    .catch(err => {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.findOne = (req, res) => {
    db.Headline.findOne({
      _id: req.params.id
    })
    .populate("note")
    .then(dbHeadline => {
      // If all Users are successfully found, send them back to the client
      res.render("view", {result: dbHeadline, user: req.session.passport.user });
    })
    .catch(err => {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.findOneJson = (req, res) => {
    db.Headline.findOne({
      _id: req.params.id
    })
    .populate("note")
    .then(dbHeadline => {
    if (dbHeadline) {
      // If all Users are successfully found, send them back to the client
      res.json({result: dbHeadline});
  } else {
  	res.redirect('/headlines');
  }
    })
    .catch(err => {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
}

exports.create = (req, res) => {
	db.Headline.findOneAndUpdate({
	 _id: req.params.id }, 
	 { saved: true })
    .then(dbHeadline => {
      // If the Article was updated successfully, send it back to the client
      res.json({result: dbHeadline});
      console.log(dbHeadline);
    })
    .catch(err => {
      // If an error occurs, send it back to the client
      res.json(err);
    });
}

exports.update = (req, res) => {
	db.Headline.findOneAndUpdate({
	 _id: req.params.id },
	 { saved: req.params.saved })
    .then(dbHeadline => {
      // If the Article was updated successfully, send it back to the client
      res.json({result: dbHeadline});
      console.log(dbHeadline);
    })
    .catch(err => {
      // If an error occurs, send it back to the client
      res.json(err);
    });
}

exports.delete = (req, res) => {
	db.Headline.findByIdAndRemove({
		_id: req.params.id
	}).then(dbHeadline => {
		return db.User.findOneAndUpdate({
    		_id: req.session.passport.user
    	}, {
    		$pull: {
    			headline: dbHeadline._id
    		} 
    	})
		res.json(dbHeadline)
	})
	.catch(err => {
			res.json(err);
		});
}
