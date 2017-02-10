var wordController = require('./words/wordController.js');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.get('/search', wordController.searchWords);
	app.post('/file', wordController.newWords);
	app.post('/insert', wordController.insertWords);

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
	  res.sendfile('./public/index.html');
	});

};