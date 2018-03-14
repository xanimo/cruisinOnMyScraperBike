let headline = require('../controllers/headline.js');
let fetch = require('../controllers/fetch.js');

module.exports = function(app) {
	app.get('/', headline.index);
	app.get('/saved', headline.saved);
	app.get('/headlines', headline.findAll);
	app.get('/headlines/:id', headline.findOne);
	app.post('/headlines/:id', headline.create);
	app.get('/fetch', fetch.scrape);
}