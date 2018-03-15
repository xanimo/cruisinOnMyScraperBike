const { fetch, headline, note, user } = require('../../controllers/');
const { isLoggedIn } = require('../auth');

module.exports = (app, passport) => {
	//scrape, save & redirect
	app.get('/fetch', isLoggedIn, fetch.scrape);
	//saved: true headlines json
	app.get('/savedJson', isLoggedIn, headline.savedJson);
	//find all headlines
	app.get('/headlines', isLoggedIn, headline.findAll);
	//find all headlines json
	app.get('/headline', isLoggedIn, headline.findAllJson);
	//find one headline 
	app.get('/headlines/:id', isLoggedIn, headline.findOne);
	//create headline
	app.post('/headlines/:id', isLoggedIn, headline.create);
	//update headline & save
	app.post('/headline/:id/:saved', isLoggedIn, headline.update);
	//find one headline json
	app.get('/headline/:id', isLoggedIn, headline.findOneJson);
	//delete headline
	app.delete('/headlines/:id', isLoggedIn, headline.delete);
	//find all notes
	app.get('/notes', isLoggedIn, note.findAll);
	//find one note
	app.get('/notes/:id', isLoggedIn, note.findOne);
	//create note
	app.post('/notes/:id', isLoggedIn, note.create);
	//delete note
	app.delete('/notes/:id/:noteid', isLoggedIn, note.delete);

	//signup, authenticate & redirect
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/account',
		failureRedirect: '/signup'
	}));
	//signin, authenticate & redirect
	app.post('/signin', passport.authenticate('local-signin', {
		successRedirect: '/account',
		failureRedirect: '/signin'
	}));
}