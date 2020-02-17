var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blogdemo_app_2");


//Post
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});	

var Post = mongoose.model("Post", postSchema);


//User
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}]
});

var User = mongoose.model("User", userSchema);

// User.create({
// 	email: "sbhanupratap@gnai.com",
// 	name: "Bhanu Pratap SIngh"
// });

Post.create({
	title: "again 2 222",
	content: "chuplar bey kap tak bakey ga"
}, function(err, post){
	if(err){
		console.log(err);
	} else{

	}
});
User.findOne({email: "sbhanupratap@gnai.com"}, function(err, user){
	if(err){
		console.log(err);
	} else{
		user.posts.push({
		title: "again 2 222",
		content: "chuplar bey kap tak bakey ga"
		});
		console.log(user);
	}
});	

// Post.create({
// 	title: "bhaag",
// 	content: "accha beta"
// }, function(err, post){
// 	User.findOne({email: "sbhanupratap@gnai.com"}, function(err, user){
// 	if(err){
// 		console.log(err)
// 	} else{
// 		user.posts.push(post);
// 		console.log(user);
// 	}});	
// });
