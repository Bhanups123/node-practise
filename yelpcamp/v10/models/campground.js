var mongoose	= require("mongoose");
var	Comment 	= require("./comment");

var yelcampSchema = new mongoose.Schema({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	name: String,
	image: String,
	description: String,
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

module.exports = mongoose.model("Campground", yelcampSchema);
