let headline = require('../controllers/headline.js');
let fetch = require('../controllers/fetch.js');
let note = require('../controllers/note.js');

module.exports = function(app) {
	app.get('/fetch', fetch.scrape);

	app.get('/', headline.index);

	app.get('/saved', headline.saved);
	app.get('/headlines', headline.findAll);
	app.get('/headline', headline.findAllJson);
	app.get('/headlines/:id', headline.findOne);
	app.get('/headline/:id', headline.findOneJson);
	app.delete('/headlines/:id', headline.delete);

	app.get('/notes', note.findAll);
	app.get('/notes/:id', note.findOne);
	app.post('/notes/:id', note.create);
	app.delete('/notes/:id/:noteid', note.delete);
}