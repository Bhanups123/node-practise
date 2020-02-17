var faker = require("faker");
console.log("=======================");
console.log("=======================");
console.log("  WELCOME TO THE SHOP");
console.log("=======================");
console.log("=======================");
for(var i=0; i<10; i++){
	var pName = faker.commerce.productName();
	var price = faker.commerce.price();
	console.log(pName + " - $" + price);
}