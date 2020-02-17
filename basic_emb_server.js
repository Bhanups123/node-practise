var app = require("express")();

app.get("/", function(req, res){
	res.render("home.ejs", {
		bhanu: "Bhanu Pratap Singh"
	});
});

app.listen(5845, function(){
	console.log("SERVER IS STARTED WITH PORT 5845");
})