// grab the mongoose module
var mongoose = require('mongoose');

// define our word model
// module.exports allows us to pass this to other files when it is called
var WordSchema = new mongoose.Schema({
  korean : {
  	type : String, required: true
  },

	origin : {
		type : String, default: ''
	},
	
	definition : {
		type : String, default: ''
	},
	
	example : {
		type : String, default: ''
	},
	
	category : {
		type : String, default: ''
	}
});

// WordSchema.pre('save', function (next) {
//   var word = this;
//   next();
// });

module.exports = mongoose.model('word', WordSchema);
