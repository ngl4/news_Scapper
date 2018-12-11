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

    axios.get("http://www.dallasnews.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        //console.log($);

        var array = [];


        // Now, we grab every h2 within an article tag, and do the following:
        $("article .crd-figure-text__content").each(function (i, element) {

            //console.log($(this).children("a").attr("href")); -- Link
            //console.log($(this).children("a").children("h3").text().trim()); ---Title
            //console.log($(this).children("p").text().trim()); --->Summary

            // Save an empty result object
            var result = {};



            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).children("a").children("h3").text().trim();
            result.link = $(this).children("a").attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                    array.push(dbArticle);
                }).catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });

            // .then(function () {
            //     db.Article.find({})
            //         .then(function (dbArticle) {
            //             // If we were able to successfully find Articles, send them back to the client
            //             res.json(dbArticle.slice(dbArticle.length - 9, dbArticle.length - 1));
            //         })
            //         .catch(function (err) {
            //             // If an error occurred, send it to the client
            //             res.json(err);
            //         });


        }).then(function () {
            res.json(array);
        });

    });

});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle.slice(dbArticle.length - 9, dbArticle.length - 1));
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

//Route for the main page
app.get("/", function (req, res) {
    res.render("index");
});



// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});