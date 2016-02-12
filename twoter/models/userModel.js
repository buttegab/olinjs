var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: String,
    logged: Boolean
});

module.exports = mongoose.model("user", userSchema);