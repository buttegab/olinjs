var mongoose = require('mongoose');
var orderSchema = mongoose.Schema({
    name: Array,
    price: Array
});

module.exports = mongoose.model("order", orderSchema);