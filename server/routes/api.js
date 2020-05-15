var express = require('express');
var router = express.Router();
require('dotenv').config();

// import the User class from User.js
var User = require('../schemas/User.js');
var Comment = require('../schemas/Comment.js');
const bcrypt= require('bcryptjs');

router.post('/createuser', function(req, res, next) {
  // construct the User from the form data which is in the request body
  var user = new User({
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    year: req.body.year,
    email: req.body.email, 
    school: req.body.school,
    bio: req.body.bio,
    tags: req.body.tags,
    isLive: req.body.isLive,
  });
  console.log("User Created")
  // save the user to the database
  user.save(err => {
    if (err) {
      res.type('html').status(400);
      res.write('uh oh: ' + err);
      console.log(err);
      res.end();
    } else {
      // send back succesful
      res.type('html').status(200);
      res.json(req.body);
    }
  });
});

router.post('/finduser', function(req, res, next) {
  var searchname = req.body.username;
  // find the policymaker
  console.log("Finding Username")
  User.findOne({ username: searchname }, (err, user) => {
    if (err) {
      res.type('html').status(200);
      console.log('uh oh' + err);
      res.write(err);
    } else if (!user) {
      res.type('html').status(400);
      res.write('There are no users with that name');
      res.end();
    } else {
      res.type('html').status(200);
      res.json(user);
    }
  });
});

router.post('/authuser', function(req, res, next) {
  var searchname = req.body.username;
  var candidate  = req.body.password;
  // find the policymaker
  console.log("Finding Username")
  User.findOne({ username: searchname }, (err, user) => {
    if (err) {
      res.type('html').status(200);
      console.log('uh oh' + err);
      res.write(err);
    } else if (!user) {
      res.type('html').status(400);
      res.write('There are no users with that name');
      res.end();
    } else {
      bcrypt.compare(candidate, user.password, function(err, isMatch) {
        if (err) {
          res.write(err)
        } else if (!isMatch) {
          res.type('html').status(500); 
          res.write('Incorrect Password');
          res.end()
        } else {
          console.log("Password matches!")
          res.json(user)
        }
      })
      
    }
  });
});



router.post('/updateuser', function(req, res, next) {
  var searchname = req.body.username;
  // find the policymaker
  console.log("Updating User")
  User.findOneAndUpdate({ username: searchname }, req.body, {new: true},  (err, user) => {
    if (err) {
      res.type('html').status(200);
      console.log('uh oh' + err);
      res.write(err);
    } else if (!user) {
      res.type('html').status(400);
      res.write('There are no users with that name');
      res.end();
    } else {
      res.type('html').status(200);
      res.json(user);
    }
  });
});

router.get('/findallusers', function(req, res, next) {
    // find all of the policymakers
    User.find((err, users) => {
      if (err) {
        res.type('html').status(200);
        console.log('uh oh' + err);
        res.write(err);
      } else if (!users) {
        res.type('html').status(400);
        res.write('No records are available at this time.');
        res.end();
      } else {
        res.type('html').status(200);
        res.json(users);
      }
    });
 });

 router.post('/findusers', function(req, res, next) {
  // find all of the policymakers
  User.find(req.body, (err, users) => {
    if (err) {
      res.type('html').status(200);
      console.log('uh oh' + err);
      res.write(err);
    } else if (!users) {
      res.type('html').status(400);
      res.write('No records are available at this time.');
      res.end();
    } else {
      res.type('html').status(200);
      res.json(users);
    }
  });
});

router.post('/createcomment', function(req, res, next) {
  // construct the User from the form data which is in the request body
  var comment = new Comment({
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    from: req.body.from, 
    to: req.body.to,
    comment: req.body.comment,
    avatar: req.body.avatar,
    image: req.body.image, 
    tagsfrom: req.body.tagsfrom,
    tagsto: req.body.tagsto,
  });
  console.log("Comment Created")
  // save the user to the database
  comment.save(err => {
    if (err) {
      res.type('html').status(400);
      res.write('uh oh: ' + err);
      console.log(err);
      res.end();
    } else {
      // send back succesful
      res.type('html').status(200);
      res.json(req.body);
    }
  });
});


router.post('/updatecomment', function(req, res, next) {
  var id = req.body._id;
  // find the policymaker
  console.log("Updating User")
  Comment.findByIdAndUpdate(id, req.body, {new: true},  (err, user) => {
    if (err) {
      res.type('html').status(200);
      console.log('uh oh' + err);
      res.write(err);
    } else if (!user) {
      res.type('html').status(400);
      res.write('There are no comments with that id');
      res.end();
    } else {
      res.type('html').status(200);
      res.json(user);
    }
  });
});


router.post('/deletecomment', function(req, res, next) {
  var id = req.body._id;
  // find the policymaker
  console.log("Deleting Comment")
  Comment.findByIdAndDelete(id, (err, user) => {
    if (err) {
      res.type('html').status(200);
      console.log('uh oh' + err);
      res.write(err);
    } else if (!user) {
      res.type('html').status(400);
      res.write('There are no comments with that id');
      res.end();
    } else {
      res.type('html').status(200);
      res.json(user);
    }
  });
});

router.post('/findcomments', function(req, res, next) {
  // find all of the policymakers
  Comment.find(req.body, (err, comments) => {
    if (err) {
      res.type('html').status(200);
      console.log('uh oh' + err);
      res.write(err);
    } else if (!comments) {
      res.type('html').status(400);
      res.write('No records are available at this time.');
      res.end();
    } else {
      res.type('html').status(200);
      res.json(comments);
    }
  });
});


module.exports = router;