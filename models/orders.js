var mongoose = require("mongoose");

var ordersSchema = mongoose.Schema({
  ingredients: [String],
});

module.exports = mongoose.model('Order', ordersSchema);
