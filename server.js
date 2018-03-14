// Dependencies
let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let cheerio = require('cheerio');
let request = require('request');
let dotenv = require('dotenv');

// Initialize Express
let app = express();
let PORT = process.env.PORT || 8000;

// Init logging & body parser
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

// Init handlebar view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// Set engine
app.set('view engine', 'handlebars');

// Set public dir for assets
app.use(express.static('public'));

// Init Mongoose ORM
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
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
require('./routes/index.js')(app);

// Listen & notify
app.listen(PORT, function() {
	console.log("App running on " + PORT);
});