var mongoose = require('mongoose');
var ingredientSchema = mongoose.Schema({
    name: String,
    stock: String
});

module.exports = mongoose.model("ingredient", ingredientSchema);