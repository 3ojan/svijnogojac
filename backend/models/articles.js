var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});
var Articles = mongoose.model('Articles', UserSchema);
module.exports = Articles;