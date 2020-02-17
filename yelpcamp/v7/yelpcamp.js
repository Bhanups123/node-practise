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

//importing routes
var campgroundRoutes	=	require("./routes/campground");
var commentRoutes		=	require("./routes/comment");
var authRoutes			=	require("./routes/index");

						//why above connect?
mongoose.connect("mongodb://localhost/yelp_camp_v7");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
seedDb();				

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

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", authRoutes);

app.listen("9999", function(){
	console.log("YELPCAMP SERVER STARTED!!!");
});