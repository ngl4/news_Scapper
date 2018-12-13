//Exporting an object that contain all of the models created
//And so in the server, you only need to require ".models"

module.exports = {
    Article: require("./Article"),
    Note: require("./Note"),
    SavedArticle: require("./SavedArticle")
};