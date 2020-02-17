var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Cat_db");

var catSchema = mongoose.Schema({	// It worked without "new" keyword
	name: String,
	age: Number,
	color: String
});

var Cat = mongoose.model("Cat", catSchema);

Cat.create({
	name: "pussy",
	age: 5,
	color: "black"
}, function(err, cat){
	if(err){
		console.log("OOPS!!! Some error occured");
	} else{
		console.log(cat);
	}
});