var express 			  = require('express'),
	bodyParser 			  = require('body-parser'),
	mongoose 			  = require('mongoose'),
	passport			  = require('passport'),
	localStrategy 		  = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	User				  = require('./models/users');

mongoose.connect("mongodb://localhost/auth_app");

app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(require('express-session')({
	secret: 'u can do it',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ROUTES

app.get("/", function(req, res){
	res.render("home");
});

app.get('/secret', isLoggedIn, function(req, res){
	res.render("secret");
});

// Auth Routes

app.get('/register', function(req, res){
	res.render('register');
});

app.post('/register', function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.redirect('/register');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect('/secret');
		});
	});
});

//Login routes

app.get('/login', function(req, res){
	res.render('login');
});

app.post('/login', passport.authenticate("local", {
	successRedirect: '/secret',
	failureRedirect: '/login'
}), function(req, res){
});	

//logout route

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
};

app.listen(4567, function(){
	console.log('Server is running');
});