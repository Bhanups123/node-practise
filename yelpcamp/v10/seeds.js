var mongoose 	= require('mongoose');
var	Comment		= require('./models/comment');
var	Campground 	= require('./models/campground');
	
var data = [
{	name: " camping", 
	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6aFshQYf-HfYeBppmCFdl4WXoKZvjbt8o9igwhSbqxhzSIECaSQ&s",
	description: "wooow"
},
{	name: "night camping",
 	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmbzHLBOgKGvE7yDB6P0EDePgmHjeGTKjUeI5px5O01S6HswHd&s",
	description: "wooow"
},
{	name: "camp gurgaon", 
	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKPkl6-QTpNwNUzYKWgb3GqYUeQWyG8BgQPPYkGL8MFwnodqaM&s",
	description: "wooow"
}]

function seed(){
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log('campgrounds removed');

		// data.forEach(function(camp){
		// 	Campground.create(camp, function(err, campground){
		// 		if(err){
		// 			console.log(err);
		// 		} else{
		// 			console.log('created campground');

		// 			//adding comment
		// 			Comment.create({
		// 				text: "this is a random Comment",
		// 				author: "Colt"
		// 			}, function(err, comment){
		// 				if(err){
		// 					console.log(err);
		// 				} else{
		// 					campground.comments.push(comment);
		// 					campground.save();
		// 					console.log('new comment created');
		// 				}
		// 			});
		// 		}

		// 	});
		//});
	})
};

module.exports = seed;