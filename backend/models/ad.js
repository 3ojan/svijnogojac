var mongoose = require('mongoose');

var AdSchema = new mongoose.Schema({
  entryDate: { type: Date, default: Date.now },
  owner: {
    type: String,
    required: true,
  },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Articles' },
  article: {
    type: String,
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
  finishDate: {
    entryDate: { type: Date, default: Date.now },
  },

  comment: {
    type: String,
  }
});
var Ad = mongoose.model('Ad', AdSchema);
module.exports = Ad;