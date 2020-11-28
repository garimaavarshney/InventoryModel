const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: Date,
  rent_price: Number,
  cost_price: Number
}, { timestamps: true });

module.exports = mongoose.model('item', itemSchema);
