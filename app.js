//import express
const express = require('express');
//make an express app
const app = express();
//require body-parser
const bodyParser = require('body-parser');
//require mongodb
const mongoDB = require('mongodb');

//tell express to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//allows us to leave off .ejs
app.set('view engine', 'ejs');

//array to temporarily hold campground data
const campgrounds = [
	{
		name  : 'Salmon Creek',
		image :
			'https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
	},
	{
		name  : 'Granite Hill',
		image :
			'https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80'
	},
	{
		name  : 'Mountain Goat Rest',
		image :
			'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
	}
];

//add landing page
app.get('/', function(req, res) {
	res.render('landing');
});

//add campgrounds page
app.get('/campgrounds', function(req, res) {
	//render page
	res.render('campgrounds', { campgrounds: campgrounds });
});

//route for submitting form for new campground
app.post('/campgrounds', function(req, res) {
	//get data from form
	const name = req.body.name;
	const image = req.body.image;
	//create new campground object
	const newCampground = { name: name, image: image };
	//push data into new campground object
	campgrounds.push(newCampground);
	//redirect back to campground page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
	//render form to create new campground
	res.render('new.ejs');
});

//set up server
app.listen(process.env.PORT || 5000, process.env.IP, function() {
	console.log('yelpcamp server started');
});

//trying to figure out how to hook up a mongodb database
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ryan:adelaide@cluster0.cr44o.mongodb.net/icampid?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
	const collection = client.db('test').collection('devices');
	// perform actions on the collection object
	client.close();
});
