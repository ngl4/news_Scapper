var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema ({

    title: {
        type: String,
        required: true
    },

    textbody: {
        type: String,
        required: true
    }

});

//After creating Schema, it is time to create Model 
var Note = mongoose.model("Note", NoteSchema);

//Export the model
module.exports = Note;

