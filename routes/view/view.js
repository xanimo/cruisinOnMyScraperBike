const { fetch, headline } = require('../../controllers/');
const { isLoggedIn } = require('../auth');

module.exports = (app, passport) => {
	//render landing
	app.get('/', fetch.index);
	//render signup
	app.get('/signup', fetch.signup);
	//render signin
	app.get('/signin', fetch.signin);
	//render account
	app.get('/account', isLoggedIn, fetch.account);
	//destroy session redirect signin
	app.get('/logout', fetch.logout);
	//render headline saved
	app.get('/saved', isLoggedIn, headline.saved);
}