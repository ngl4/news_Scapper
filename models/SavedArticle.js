var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({

    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    //store Note id (populate Article with an associated Note)
    notes: [{
        type: Schema.Types.ObjectId,
        ref:"Note"
    }]

});

//After created the above Schema, now it is time to create a model 
var SavedArticle = mongoose.model("SavedArticle", ArticleSchema);

//Export the Article model
module.exports = SavedArticle; 