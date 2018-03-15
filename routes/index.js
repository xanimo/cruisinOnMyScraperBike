let headline = require('../controllers/headline.js');
let fetch = require('../controllers/fetch.js');
let note = require('../controllers/note.js');

module.exports = function(app, passport) {
	app.get('/fetch', isLoggedIn, fetch.scrape);
	app.get('/', fetch.index);
	app.get('/signup', fetch.signup);
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/account',
		failureRedirect: '/signup'
	}));
	app.get('/signin', fetch.signin);
	app.post('/signin', passport.authenticate('local-signin', {
		successRedirect: '/account',
		failureRedirect: '/signin'
	}));
	app.get('/account', isLoggedIn, fetch.account);
	app.get('/logout', fetch.logout);
	app.get('/saved', isLoggedIn, headline.saved);
	app.get('/savedJson', headline.savedJson);
	app.get('/headlines', isLoggedIn, headline.findAll);
	app.get('/headline', isLoggedIn, headline.findAllJson);
	app.get('/headlines/:id', isLoggedIn, headline.findOne);
	app.post('/headlines/:id', isLoggedIn, headline.create);
	app.post('/headline/:id/:saved', isLoggedIn, headline.update);
	app.get('/headline/:id', isLoggedIn, headline.findOneJson);
	app.delete('/headlines/:id', isLoggedIn, headline.delete);
	app.get('/notes', isLoggedIn, note.findAll);
	app.get('/notes/:id', isLoggedIn, note.findOne);
	app.post('/notes/:id', isLoggedIn, note.create);
	app.delete('/notes/:id/:noteid', isLoggedIn, note.delete);
	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/signin');
	}
}