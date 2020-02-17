var express     =	require("express"),
	app 		= 	express(),
	bodyParser  = 	require("body-parser"),
	mongoose    = 	require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));

//		Schema
var yelcampSchema = new mongoose.Schema({
	name: String, 
	image: String
});

var Campground = mongoose.model("Campground", yelcampSchema);


// var campgrounds = [
// {name: " camping", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6aFshQYf-HfYeBppmCFdl4WXoKZvjbt8o9igwhSbqxhzSIECaSQ&s"},
// {name: "night camping", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmbzHLBOgKGvE7yDB6P0EDePgmHjeGTKjUeI5px5O01S6HswHd&s"},
// {name: "camp gurgaon", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKPkl6-QTpNwNUzYKWgb3GqYUeQWyG8BgQPPYkGL8MFwnodqaM&s"},
// {name: " camping", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6aFshQYf-HfYeBppmCFdl4WXoKZvjbt8o9igwhSbqxhzSIECaSQ&s"},
// {name: "night camping", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmbzHLBOgKGvE7yDB6P0EDePgmHjeGTKjUeI5px5O01S6HswHd&s"},
// {name: "camp gurgaon", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKPkl6-QTpNwNUzYKWgb3GqYUeQWyG8BgQPPYkGL8MFwnodqaM&s"},
// {name: " camping", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6aFshQYf-HfYeBppmCFdl4WXoKZvjbt8o9igwhSbqxhzSIECaSQ&s"},
// {name: "night camping", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmbzHLBOgKGvE7yDB6P0EDePgmHjeGTKjUeI5px5O01S6HswHd&s"},
// {name: "camp gurgaon", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKPkl6-QTpNwNUzYKWgb3GqYUeQWyG8BgQPPYkGL8MFwnodqaM&s"} 
//  ];

app.get("/", function(req, res){
	res.render("home");
});

app.get("/campgrounds", function(req, res){

	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds", {
				campgrounds: allcampgrounds
			});
		}
	});

});
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;

	var newcampground = {name: name, image: image};

	//	campgrounds.push(newcampground);

	Campground.create(
	newcampground
	, function(err, campground){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	});

});
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});
app.listen("9999", function(){
	console.log("YELPCAMP SERVER STARTED!!!");
});