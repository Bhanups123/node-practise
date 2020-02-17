var body_parser = require("body-parser")
	mongoose 	= require("mongoose")
	express		= require("express")
	app 		= express();

//app config
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: true}));
app.use(express.static("Public"));
mongoose.connect("mongodb://localhost/blogs_app");

//model config
var	blogSchema = new mongoose.Schema({
	title : String,
	image : String , 		//Not working why????????????????????????????
	body  : String,
	created: { type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//Routes
app.get("/", function(req, res){
	res.redirect("/blogs");
});
app.get("/blogs", function(req, res){

	Blog.find({}, function(err, all){
		if(err){
			console.log(err);
		} else{
			res.render("index", { blogs: all});
		}
	});
});

//New route
app.get("/blogs/new", function(req, res){
	res.render("new");
});

//Create route
app.post("/blogs", function(req, res){
	blog_new = req.body.blog;

	Blog.create(blog_new, function(err, blog){
		if(err){
			console.log(err);
			res.redirect("/blogs/new");
		} else{
			console.log(blog);
			res.redirect("/blogs");
		}
	});
});

//Show route
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err){
			res.redirect("/blogs");
		} else{
			res.render("show", {blog: blog });
		}
	});

//Edit Route
app.get("/blogs/:id/Edit", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err){
			res.redirect("/blogs/blog._id");
		} else{
			res.render("edit", {blog: blog});
		}
	});
});	

//Update Route 					Make it a put route!!!!!!!!!!!!!!!!111
});
app.post("/blogs/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedblog){
		if(err){
			res.redirect("/blogs/" + req.params.id);
			//res.redirect("/blogs");
		} else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});
	
//Delete Route 								
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else{
			res.redirect("/blogs");
		}
	});
});	

app.listen(2000, function(){
	console.log("Blogs server started with PORT NO. 2000");
});