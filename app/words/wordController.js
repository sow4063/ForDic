var fs = require('fs');
var Q = require('q');
var Word = require('./wordModel.js');

// Promisify a few mongoose methods with the `q` promise library
var findWords = Q.nbind(Word.find, Word);
var createWord = Q.nbind(Word.create, Word);
var removeWords = Q.nbind(Word.remove, Word);

module.exports = {

	searchWords: function(req, res, next){

    console.log('keyword = ', req.query.keyword );
    console.log('condition = ', req.query.condition );

    let query = {};

    if( req.query.condition === 'korean') {
      query['korean'] = { "$regex": req.query.keyword }
    }
    else if( req.query.condition === 'origin') {
      query['origin'] = { "$regex": req.query.keyword }
    }
    else if( req.query.condition === 'category') {
      query['category'] = { "$regex": req.query.keyword }
    }

		findWords( query )
      .then(function(words) {
      	if( words.length ) {
      		console.log('word already exist!');
          res.send( words );
        } 
        else {
          res.json( [] );
        }
      	
      })
      .fail(function (error) {
      	res.json( error );
      });
	},

	newWords: function (req, res, next) {

    var fileName = req.body.fileName;
		console.log('app.post.fileName = ', fileName);

    // read the data from the file
		fs.readFile(fileName, 'utf8', function(err, data){
		  var words = data.split('\n');
		  console.log('readFile length = ', words.length );
		  
		  var wordArr = new Array(words.length);

		  for(let i = 0; i < words.length; i++ ){
		  	var dic = words[i].split('#');

		  	let newWord = {};

		    newWord['korean'] = dic[0];  		  	
        newWord['origin'] = dic[1];
		    newWord['definition'] = dic[2];
		    newWord['example'] = dic[3];
		    newWord['category'] = dic[4];

		    wordArr[i] = newWord;
		  }
		  
		  console.log('the last line = ', wordArr.length );

      removeWords({})
        .then(function(result){
          createWord( wordArr )
			    .then(function(result){
	          res.json( result.length );
			    })
			    .fail(function(err){
	          res.json( error );
			    });
        })
        .fail(function(err){
        	res.json( error );
        });
		  
		});  
    
  }
};
