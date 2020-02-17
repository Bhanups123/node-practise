var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var newcat = new Cat({
// 	name: "mice",
// 	age: 3,
// 	temperament: "clever"
// });
// newcat.save(function(err, cat){
// 	if(err){
// 		console.log("ooops  something wrong!!");
// 		console.log(err);
// 	} else{
// 		console.log("cat added successfully");
// 		console.log(cat);
// 	}
// });	ALTERNATE WAY BY USING CREATE METHOD

// Cat.create({
// 	name: "pui",
// 	age: 2,
// 	temperament: "cool"
// }, function(err, cats){
// 	if(err){
// 		console.log("oops");
// 		console.log(err);
// 	} else{
// 		console.log("successfully added");
// 		console.log(cats);
// 	}
// });

Cat.find({}, function(err, cats){
	if(err){
		console.log("something wrong!!");
		console.log(err);
	} else{
		console.log("all the cats____");
		console.log(cats);
	}
});

