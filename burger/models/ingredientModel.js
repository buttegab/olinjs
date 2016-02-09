var mongoose = require('mongoose');
var ingredientSchema = mongoose.Schema({
    name: String,
    price: Number,
    stock: String
});

module.exports = mongoose.model("ingredient", ingredientSchema);