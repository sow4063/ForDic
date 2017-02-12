var mongoose = require('mongoose');

var url = 'mongodb://localhost/dic';

// // connect to our mongoDB database (commented out after you enter in your own credentials)
// var db = mongoose.connect(url);

module.exports = {
	url: 'mongodb://localhost/dic',
	db: mongoose.connect(url)
};

