var fs = require('fs');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.post('/file', function(req, res){
		var fileName = req.body.fileName;
		console.log('app.post.fileName = ', fileName);

    // read the data from the file
		fs.readFile(fileName, 'utf8', function(err, data){
		  var words = data.split('\n');
		  console.log('readFile length = ', words.length );

		  var word = {};

		  for(let i = 0; i < words.length; i++ ){
		  	var dic = words[i].split('#');
		    word['korean'] = dic[0];  
		    word['origin'] = dic[1];
		    word['definition'] = dic[2];
		    word['example'] = dic[3];
		    word['category'] = dic[4];
		  }

		  console.log('the last line = ', word );
		});  

		// insert into the mongodb

		// respond to the client
		res.json('OK.');

	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
	  res.sendfile('./public/index.html');
	});

};