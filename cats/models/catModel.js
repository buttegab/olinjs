
var mongoose = require('mongoose');
var kittySchema = mongoose.Schema({
    name: String,
    age: String,
    color: String
});

module.exports = mongoose.model("cat", kittySchema);