var mongoose = require('mongoose');
var timestamps = require('mongoose-times');
var postSchema = mongoose.Schema({
    author: String,
    post: String,
    time: Number
});
postSchema.plugin(timestamps);

module.exports = mongoose.model("posts", postSchema);