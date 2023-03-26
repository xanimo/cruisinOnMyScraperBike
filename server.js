// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const http = require('http');

require('dotenv').config();

async function run() {
	const app = express();
	app.use(logger('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	var hbs = exphbs.create({ /* config */ });
	app.engine('handlebars', hbs.engine);
	app.set('view engine', 'handlebars');
	app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));
	app.use('/scripts', express.static(__dirname + '/node_modules/@popperjs/core/dist/'));
	app.use('/scripts', express.static(__dirname + '/node_modules/es-module-shims/dist/'));
	app.use(express.static('css'));
	app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
	app.use(passport.initialize());
	app.use(passport.session());

	const uri = process.env.MONGODB_URL
	mongoose.Promise = Promise;
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});

	const db = mongoose.connection;
	db.on('error', function(err) { console.log("Mongoose error: ", err); });
	db.once('open', function() { console.log("Mongoose connection successful."); });

	require('./routes')(app, passport);
	require('./config/passport/passport.js')(passport, db.User);

	const PORT = process.env.PORT || 8000;
	const server = http.createServer(app);
	server.listen(PORT, function() {
		console.log("App running on " + PORT);
	});

	if (module.hot) 
		module.hot.accept(server, function() {
			server.removeListener('request', app)
			server.on('request', app);
		});
}

run();