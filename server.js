// Dependencies
let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let cheerio = require('cheerio');
let request = require('request');
let dotenv = require('dotenv');
let passport = require('passport');
let session = require('express-session');


// Initialize Express
let app = express();
let PORT = process.env.PORT || 8000;

// Init logging & body parser
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));

// Init handlebar view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// Set engine
app.set('view engine', 'handlebars');

// Set public dir for assets
app.use(express.static('public'));

// Passport
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Init Mongoose ORM
let MONGOLAB_YELLOW_URI = process.env.MONGOLAB_YELLOW_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGOLAB_YELLOW_URI, {
  useMongoClient: true
});

let db = mongoose.connection;

// Log db errors
db.on('error', function(err) {
  console.log("Mongoose error: ", err);
});

// Log db success
db.once('open', function() {
  console.log("Mongoose connection successful.");
});

// Configure routes
let authRoute = require('./routes')(app, passport);

// Load passport strategies
require('./config/passport/passport.js')(passport, db.User);

// Listen & notify
app.listen(PORT, function() {
	console.log("App running on " + PORT);
});