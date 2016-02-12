var mongoose = require('mongoose');
var postSchema = mongoose.Schema({
    author: String,
    post: String
});

module.exports = mongoose.model("posts", postSchema);