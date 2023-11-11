var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {

    mongoose.model('User').find(function(err, users){
      if (err){console.log(err);}
      res.render('users', {title: 'Users With Profile', users});
      //  res.send(users);
    });
    // res.sendFile(__dirname + '/index.html');

});

router.get('/:username', function(req, res){
  mongoose.model('User').findOne({name: req.params.username}, function(err, users){
    if(err){console.log(err);}
    if(!users){
      console.log("Unknown User Entry!");
      res.redirect('/');
    }
      else{
        console.log('Logged in successfully!');
        res.render('visit', {title: 'The Profile of ' + users.name, email: users.email, profile_pic: users.profile_pic, users});
      }
  });
})

module.exports = router;
