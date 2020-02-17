var express = require("express");
var app = express();
var catme = require("cat-me");

app.get("/", function(req, res){
	res.send("welcome to dis............." + catme());
});
app.get("/speak/:sound", function(req, res){
	var p = req.params.sound;
	if(p === "pig"){
		res.send(p + " sounds like" + " hurad hurad");
	}
	else if(p === "cow"){
		res.send(p + " sounds like" + " humbey");
	}
	else if(p === "dog"){
		res.send(p + " sounds like" + "woo wooo!!!!!!!!!!!");
	}
});
app.get("/repeat/:word/:freq", function(req, res){
	var w = req.params.word;
	var f = req.params.freq;

	var z = " ";
	for(var i=0; i<Number(f); i++){
		z+= w + " "; 
	}
	res.send(z);
});
app.get("*", function(req, res){
	res.send("Pagae not found!!!!!U R WASTING UR LIFE");
});

app.listen(6039, function(){
	console.log("SERVER WITH PORT 6039 IS STARTED");
})