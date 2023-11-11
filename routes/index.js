var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

var user_session;

/* GET home page. */

router.get('/', function(req, res) {
  //console.log(__dirname);
  res.sendFile(__dirname + 'index.html');
})


router.post('/addwork', function(req, res) {
  mongoose.model('User').findOne({email: user_session}, function(err, users){
    if(err){console.log(err);}
    if(!users){
      console.log("Unknown User Adding Entry!");
    }
    else {
      console.log('Adding Work Data to User..');
      var new_work = req.body.work;
      users.work.push(new_work);
      users.save();
      console.log('Work Data added successfully!');
      console.log(users.work);
      res.render('profile', {title: 'Hello There !' + users.name, profile_pic: users.profile_pic, email:users.email, users});
    }
  });

})

router.post('/addscreenshot', function(req, res) {
  mongoose.model('User').findOne({email: user_session}, function(err, users){
    if(err){console.log(err);}
    if(!users){
      console.log("Unknown User Adding Entry!");
    }
    else {
      console.log('Adding screenshot Data to User..');
      var new_screenshot = req.body.screenshot;
      users.screenshot.push(new_screenshot);
      users.save();
      console.log('screenshot Data added successfully!');
      console.log(users.screenshot);
      res.render('profile', {title: 'Hello There !' + users.name, profile_pic: users.profile_pic, email:users.email, users});
    }
  });

})

router.post('/login', function(req, res) {
  var user_email = req.body.email;
  var user_pass = req.body.password;
  user_session = req.body.email;
  mongoose.model('User').findOne({email: user_email, password: user_pass}, function(err, users){
    if(err){console.log(err);}
    if(!users){
      console.log("Unknown User Login Entry!");
      res.redirect('/');
    }
    else{
      console.log('Logged in successfully!');
      // console.log(users);
      res.render('profile', {title: 'Hello There !' + users.name, profile_pic: users.profile_pic, email:users.email, users});
    }

  })

})

router.post('/register', function(req, res){
  if(req.body.email !="" && req.body.password !=""){
    var newUser = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      profile_pic: req.body.profile_pic,
    });
    user_session = req.body.email;
    console.log('Pending..');
    console.log(newUser);

    newUser.save(function(err) {
      if (err) throw err;
      console.log('User saved successfully!');
      res.render('profile', {title: 'Hello There !' + req.body.name, profile_pic: req.body.profile_pic, email:req.body.email, users: newUser});
    });
  }
  else {
    console.log('Missing Data entry .. User Failed to be saved!');
    res.redirect('/')
  }
  // res.render('profile', {title: 'Hello There !' + req.body.name, profile_pic: req.body.profile_pic, email:req.body.email, newUser});
})

module.exports = router;
