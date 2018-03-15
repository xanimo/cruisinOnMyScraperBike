let axios = require("axios");
let cheerio = require("cheerio");
let db = require("../models/");

var exports = module.exports = {}

exports.scrape = function(req, res) {
	// First, we grab the body of the html with request
  axios.get("http://www.echojs.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
      // Create a new Article using the `result` object built from scraping
      db.Headline.findOne({ 
        'link': result.link }, 
        'link title', 
        function(err, headline) {
          if (err) return handleError(err);
          console.log(headline);
          if (!headline) {
      db.Headline.create(result)
        .then(function(dbHeadline) {
          // View the added result in the console
          console.log(dbHeadline);
          return db.User.findOneAndUpdate({ _id: req.params.id }, { headline: dbHeadline._id }, { new: true });
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        }); 
        }     
      });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.redirect("/headlines");
  });
}

exports.signup = function(req, res) {
  res.render('signup');
}

exports.signin = function(req, res) {
  res.render('signin');
}

exports.account = function(req, res) {
  res.render('account');
}

exports.index = function(req, res) {
  res.render('index');
}

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/signin');
  });
}

