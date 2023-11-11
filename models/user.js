var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {type:String, unique:true},
  password: String,
  name: {type:String, unique:true},
  work: ['Work1', 'Screenshot1'],
  screenshot: [],
  profile_pic: String,
});

var User = mongoose.model('User',userSchema);
module.exports = User;
