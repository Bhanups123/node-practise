var express= require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){

	res.render("home_conditional", {
		str: ["bhanu", "pratap", "singh"]
	});
});
app.listen(4694, function(){
	console.log("SERVER HAS BEEN STARTED WITH PORT 4694");
});
