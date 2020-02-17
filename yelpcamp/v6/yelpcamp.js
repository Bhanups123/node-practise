var express     =	require("express"),
	app 		= 	express(),
	bodyParser  = 	require("body-parser"),
	mongoose    = 	require("mongoose"),
	Campground  =   require("./models/campground"),
	Comment 	=   require("./models/comment"),
	LocalStrategy = require("passport-local"),
	User		=	require("./models/user"),
	passport 	=	require("passport"),
	seedDb		=   require("./seeds")

						//why above connect?
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
seedDb();				

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

//passport configuration

app.use(require('express-session')({
	secret: "hey there how r u",
	resave: false,
	uninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	//console.log(req.user);
	res.locals.currentUser = req.user;
	next();
});

app.get("/", function(req, res){
	res.render("home");
});

app.get("/campgrounds", function(req, res){

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
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;

	var newcampground = {name: name, image: image, description: desc};

	//	campgrounds.push(newcampground);.
	

	Campground.create(newcampground, function(err, campground){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	});

});
//new route
app.get("/campgrounds/new", function(req, res){
	res.render("campground/new");
});

//show route
app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, selected_campground){
		if(err){
			console.log(err);
		} else{
			console.log(selected_campground);
			res.render("campground/description", { campground: selected_campground});
		}
	});
});

//new comment route
app.post('/campgrounds/:id/comments', isLoggedIn, function(req,res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/'+ req.params.id);
				}
			})
		}
	});
});	

app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){			//id of which????
		if(err){
			console.log(err);
		} else{
			res.render('comment/new',{ campground: campground });
		}
	});
});

//auth routes

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) =>{
	var newUser = new User({ username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect('/campgrounds');
		});
	});
});

//login routes

app.get('/login', function(req, res){
	res.render('login');
});

app.post('/login', passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){

});

//logout

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/campgrounds');
});

//middleware fn
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};

app.listen("9999", function(){
	console.log("YELPCAMP SERVER STARTED!!!");
});