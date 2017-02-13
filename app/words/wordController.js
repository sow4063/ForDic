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
    else if( req.query.condition === 'definition') {
      query['definition'] = { "$regex": req.query.keyword }
    }
    else if( req.query.condition === 'example') {
      query['example'] = { "$regex": req.query.keyword }
    }
    else if( req.query.condition === 'category') {
      query['category'] = { "$regex": req.query.keyword }
    }

		findWords( query )
      .then(function(words) {
      	if( words.length ) {
      		console.log('word already exist! ::: length = ', words.length);
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

  removeWord: function(req, res, next){
    removeWords({korean: req.query.keyword})
      .then(function(result){
        res.json( result );
      })
      .fail(function(err){
        res.json( error );
      });
  },

  insertWords: function (req, res, next) {

    var fileName = req.body.fileName;
    
    // read the data from the file
    fs.readFile(fileName, 'utf8', function(err, data){

      var words = data.split('\n');
      console.log('readFile length = ', words.length );
      
      var length = words.length;
      var wordArr = new Array(length);
      
      for( let i = 0; i < length; i++ ){
        var dic = words[i].split('#');

        let newWord = {};

        newWord['korean'] = dic[0];         
        newWord['origin'] = dic[1];
        newWord['definition'] = dic[2];
        newWord['example'] = dic[3];
        newWord['category'] = dic[4];

        wordArr[i] = newWord;
      }
      
      console.log('the word length = ', length );

      createWord( wordArr )
        .then(function(result){
          res.json( result.length );
        })
        .fail(function(err){
          res.json( error );
        });
      
    });  
    
  },

	newWords: function (req, res, next) {

    var fileName = req.body.fileName;
		console.log('app.post.fileName = ', fileName);

    // read the data from the file
		fs.readFile(fileName, 'utf8', function(err, data){
		  var words = data.split('\n');
		  console.log('readFile length = ', words.length );
		  
      var length = words.length;
		  var wordArr = new Array(length);
      
		  for( let i = 0; i < length; i++ ){
		  	var dic = words[i].split('#');

		  	let newWord = {};

		    newWord['korean'] = dic[0];  		  	
        newWord['origin'] = dic[1];
		    newWord['definition'] = dic[2];
		    newWord['example'] = dic[3];
		    newWord['category'] = dic[4];

		    wordArr[i] = newWord;
		  }
		  
		  console.log('the last line = ', length );

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
