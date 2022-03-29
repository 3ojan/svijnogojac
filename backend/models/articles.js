var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  name: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
  },
  unit: {
    type: String,
  },
});
var Articles = mongoose.model('Articles', UserSchema);
module.exports = Articles;