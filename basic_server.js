var express = require("express");
var app = express();
//routes
app.get("/", function(req, res){
	res.send("hello!!!!");
});
app.get("/hru", function(res, res){
	res.send("GREAT!!! bro");
})
app.get("/:bye", function(req, res){
	var inp = req.params.bye;
	res.send("GOOD BYE>>>>" + inp + " yeh;;;;;;;");
})
app.get("*", function(req, res){
	console.log(req.params);
	res.send("hey therre}}}}}}}}}");
});
app.listen(4520, function(){
	console.log("Server started with PORT 4520!!!!");
})