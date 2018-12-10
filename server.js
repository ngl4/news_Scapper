var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scapper", {
    useNewUrlParser: true
});

// Set Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Routes

//Listen to the scrape api route 
app.get("/scrape", function (req, res) {
    
    //show a scrape button (index page)

    

});


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});