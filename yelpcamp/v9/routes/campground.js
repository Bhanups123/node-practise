var express = require("express");
var router	= express.Router();
var Campground = require("../models/campground");

router.get("/", function(req, res){

	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("campground/campgrounds", {
				campgrounds: allcampgrounds,
			});
		}
	});

});
router.post("/", isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;

	var newcampground = {name: name, image: image, description: desc};

	//	campgrounds.push(newcampground);.
	

	Campground.create(newcampground, function(err, campground){
		if(err){
			console.log(err);
		} else{
			campground.author.id = req.user._id;
			campground.author.username = req.user.username;
			campground.save();
			//console.log(campground);

			res.redirect("/campgrounds");
		}
	});

});
//new route
router.get("/new", isLoggedIn, function(req, res){
	res.render("campground/new");
});

//show route
router.get("/:id", function(req, res){
	Campground.findById(req.params.id, function(err, selected_campground){
		if(err){
			console.log(err);
		} else{
			console.log(selected_campground);
			res.render("campground/description", { campground: selected_campground});
		}
	});
});

//middleware fn  
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};


module.exports	=	router;