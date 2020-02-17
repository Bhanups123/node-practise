var express = require("express");
var router	= express.Router({ mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//new comment route
router.post('/', isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else{
					comment.author.username = req.user.username;
					comment.author.id = req.user._id;
					comment.save();

					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/'+ req.params.id);
				}
			})
		}
	});
});	

router.get('/new', isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){			//id of which????
		if(err){
			console.log(err);
		} else{
			res.render('comment/new',{ campground: campground });
		}
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};

module.exports	=	router;