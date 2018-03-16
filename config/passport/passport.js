const db = require('../../models/');

const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
	let User = db.User;
	let LocalStrategy = require('passport-local').Strategy;

	passport.use('local-signin', new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		let isValidPassword = function(userpass, password) {
			return bCrypt.compareSync(password, userpass);
		}
		User.findOne({ email: email }, function(err, user) {
			
			if (err) {
				console.log(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Email does not exist'
				});
			}
			if (!isValidPassword(user.password, password)) {
				return done(null, false, {
					message: 'Incorrect password.'
				});
			}

			return done(null, user);
		});
	}
));

	passport.use('local-signup', new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		let generateHash = function(password) {
			return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
		};
		db.User.findOne({
			where: {
				email: email
			}
		}).then(function(user) {
			if (user) {
				return done(null, false, {
					message: 'That email is already taken!'
				});
			} else {
				let userPassword = generateHash(password);
				let data = {
					email: email,
					password: userPassword,
					firstname: req.body.firstname,
					lastname: req.body.lastname,
				};
			db.User.create(data).then(function(newUser, created) {
				if (!newUser) {
					return done(null, false);
				}
				if (newUser) {
					return done(null, newUser);
				}
			});
			}
		});
	}
	));

		passport.serializeUser(function(user, done) {
			done(null, user._id);
		});
		passport.deserializeUser(function(id, done) {
			User.findById(id, function(err, user) {
				if (err) {
					console.log(err);
				} else {
				done(null, user.get);
				}
		});
	});
}