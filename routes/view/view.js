const { fetch } = require('../../controllers/');
const { isLoggedIn } = require('../auth');

module.exports = (app) => {
	app.get('/', fetch.index);
	app.get('/signup', fetch.signup);
	app.get('/signin', fetch.signin);
	app.get('/account', isLoggedIn, fetch.account);
	app.get('/logout', fetch.logout);
}