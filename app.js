// NPM Modules
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var exphbs  = require("express-handlebars");

var home = require('./routes/home')();

// Mongoose, Express, Passport

var app = express();
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);
var PORT = process.env.PORT || 3000;

app.set('views', __dirname + '/views');

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTING
app.get('/', home.getHome);
app.get('/kitchen', home.getKitchen);
app.get('/api/ingredients', home.getIngredients);
app.get('/api/orders', home.getOrders);

app.post('/api/order', home.postOrder);
app.post('/api/delOrder', home.deleteOrder);

// -- Listen
app.listen(PORT);
