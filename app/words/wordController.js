var fs = require('fs');
var Q = require('q');
var Word = require('./wordModel.js');

// Promisify a few mongoose methods with the `q` promise library
var findWord = Q.nbind(Word.findOne, Word);
var createWord = Q.nbind(Word.create, Word);

module.exports = {

	newWords: function (req, res, next) {

    var fileName = req.body.fileName;
		console.log('app.post.fileName = ', fileName);

    // read the data from the file
		fs.readFile(fileName, 'utf8', function(err, data){
		  var words = data.split('\n');
		  console.log('readFile length = ', words.length );

		  var newWord = {};

		  for(let i = 0; i < words.length; i++ ){
		  	var dic = words[i].split('#');

		    newWord['korean'] = dic[0];  		  	
        newWord['origin'] = dic[1];
		    newWord['definition'] = dic[2];
		    newWord['example'] = dic[3];
		    newWord['category'] = dic[4];
		  }
		  console.log('the last line = ', newWord );

		  findWord({korean:newWord.korean})
      .then(function(word) {
      	if(word) {
      		console.log('word already exist!');
          res.json('word already exist!');
        } 
        else {
          // make a new word if not one
          res.json( createWord(newWord) );
        }
      	
      })
      .fail(function (error) {
      	// respond to the client
		    res.json( error );
      });
		});  
    
  }
};
