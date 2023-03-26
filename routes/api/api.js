const { fetch, user } = require('../../controllers/');
const { isLoggedIn } = require('../auth');

module.exports = (app, passport) => {
	app.get('/user', isLoggedIn, user.fetch);
	app.get('/user/:id', isLoggedIn, user.fetchOne);
	app.post('/user', isLoggedIn, user.create);
	app.post('/user/:id', isLoggedIn, user.update);
	app.delete('/user/:id', isLoggedIn, user.delete);
	app.post('/signup', passport.authenticate('local-signup', { successRedirect: '/account', failureRedirect: '/signup' }));
	app.post('/signin', passport.authenticate('local-signin', { successRedirect: '/account', failureRedirect: '/signin' }));
}