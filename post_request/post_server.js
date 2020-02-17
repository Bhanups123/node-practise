var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var friend = ["bhanu", "miransda", "aa p", "a z"];

app.get("/friends", function(req, res){
	res.render("home_post", {
		friends: friend
	});
});
app.post("/addfriend", function(req, res){
	var new_friend = req.body.newfriend;
	friend.push(new_friend);
	res.redirect("/friends");
});
app.listen("1234", function(){
	console.log("Server started!!!!____");
});