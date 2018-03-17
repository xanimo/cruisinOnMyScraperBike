const db = require('../models/');

var exports = module.exports = {}

exports.fetch = function(req, res) {
	db.User.find({})
	.then(dbUser => {
		res.json(dbUser);
	})
	.catch(err => {
		res.json(err);
	});
}

//user authenticated headlines
exports.fetchHeadline = function(req, res) {
	db.User.find({
		_id: req.session.passport.user
	}, 'firstname lastname email last_login')
	.populate('headline', null, { saved: false })
	.then(dbUser => {
		res.render('results', { result: dbUser, user: req.session.passport.user });
	})
	.catch(err => {
		res.json(err);
	});
}

exports.fetchOne = function(req, res) {
	db.User.findOne({
		_id: req.params.id
	}, 'firstname lastname email last_login')
	.then(dbUser => {
		res.json(dbUser);
	})
	.catch(err => {
		res.json(err);
	});
}

exports.create = function(req, res) {
	db.User.create(req.body)
	.then(dbUser => {
		res.json(dbUser);
	})
	.catch(err => {
		res.json(err);
	});
}

exports.update = function(req, res) {
	db.User.findOneAndUpdate({
		_id: req.params.id
	}, req.body)
	.then(dbUser => {
		res.json(dbUser);
	})
	.catch(err => {
		res.json(err);
	});
}

exports.delete = function(req, res) {
	db.User.findByIdAndRemove({
		_id: req.params.id
	})
	.then(dbUser => {
		res.json(dbUser);
	})
	.catch(err => {
		res.json(err);
	});
}