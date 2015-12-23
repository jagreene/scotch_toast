var mongoose = require("mongoose");

var ordersSchema = mongoose.Schema({
    ingredients: [String],
    name: String,
});

module.exports = mongoose.model('Order', ordersSchema);
