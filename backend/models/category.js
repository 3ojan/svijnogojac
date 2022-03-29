var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  }
});
var Category = mongoose.model('Category', UserSchema);
module.exports = Category;