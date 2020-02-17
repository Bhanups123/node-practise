var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blogdemo_app");


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
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


//adding to user db
var userdb = new User({
	email: "sbhanupratap@gmail.com",
	name: "Bhanu Pratap Singh"
});
userdb.save(function(err, user){
	if(err){
		console.log(err);
	}	else{
		console.log(user);
	}
});


//adding to post db
var postdb = new Post({
	title: "random",
	content: "kya karega tu adh ke"
});
postdb.save(function(err, post){
	if(err){
		console.log(err);
	}	else{
		console.log(post);
	}
});

User.findOne({name: "Bhanu Pratap Singh"}, function(err,user){
	if(err){
		console.log(err);
	}	else{
		user.posts.push({
			title: "againg",
			content: "chal nikal"
		});
		user.save(function(err, updatedUser){
			if(err){
				console.log(err);
			}	else{
				console.log(updatedUser);
			}
		});
	}
});