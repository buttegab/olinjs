var mongoose = require('mongoose');
var ingredientSchema = mongoose.Schema({
    name: String,
    logged: Boolean
});

module.exports = mongoose.model("ingredient", ingredientSchema);