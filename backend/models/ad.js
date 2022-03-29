var mongoose = require('mongoose');

var AdSchema = new mongoose.Schema({
  entryDate: { type: Date, default: Date.now },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Articles',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  wantedPrice: {
    type: Number,
    required: true,
  },
  finishDate: { type: Date, default: Date.now },
  comment: {
    type: String,
  },
  status: {
    type: Number,
  },
  buysell: {
    type: Number,
  },
  amount: {
    type: Number,
    required: true
  }
});
var Ad = mongoose.model('Ad', AdSchema);
module.exports = Ad;