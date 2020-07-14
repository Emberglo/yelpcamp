//require express
var express = require('express');
//make an express app
var app = express();

app.listen(process.env.PORT, process.env.IP, function() {
	console.log('yelpcamp server started');
});
