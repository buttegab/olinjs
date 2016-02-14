var express = require('express');
var router = express.Router();
var usr= require('../models/userModel');
var post = require('../models/postModel')
var mongoose = require('mongoose');
//var timestamps = require "mongoose-times"
mongoose.connect('mongodb://localhost/twote');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var twote = {}


// //working
twote.getUsers = function(req, res){

  var callback = function(req, res){
    return function(err, users){
      if (err){
        console.log('error occured');
        return;
      };
      var callback2 = function(req, res){
        return function(err, posts){
          if (err){
            console.log('error occured');
          return;
        };
        var results = {"user": users, "post": posts}
        //res.render("home", {"user": users});
        res.render("home", {"result": results});
     };
  }

      //res.render("home", {"user": users});
      // post.find({}, {sort: {created: -1}}, callback2(req, res))
      post.find({}, null, {sort: '-created'}, callback2(req, res))
      // Room.find({}, null, {sort: '-date'}, function(err, docs)

      //res.render("home", {"user": users});
    };
    
    //post.find(callback2(req, res))
  }
  usr.find(callback(req, res))
};

twote.login = function(req, res){
  var callback = function(req, res){
    return function(err, users){
      if (err){
        console.log('error occured');
        return;
      };
      res.render("login", {"user": users});
    };
  }
  usr.find(callback(req, res))
};

twote.addUser = function(req, res) {
  newUsr = new usr({name: req.query.name, logged: true});
    newUsr.save(function (err) {
      if (err) return console.error(err);
    });
  
  //vas = {name:req.query.name, price: req.query.price};
  //res.render("home", {"loggedIn": req.query.name});

  res.send(req.query.name);
}

twote.logout = function(req,res) {
  usr.update({logged: true},{$set:{logged: false}}, function(err, cats) {
    if (err) {
      res.status(500).send("Something broke!");
      };
    res.send(cats);
    });
  
}

twote.getLogged = function(req, res) {
  var callback = function(req, res){
    return function(err, users){
      if (err){
        console.log('error occured');
        return;
      };
      res.send(users);
    };
  }
  usr.find({ 'logged': true },callback(req, res))
}


twote.addPost = function(req, res) {
  newPost = new post({author: req.query.author, post: req.query.post});
    newPost.save(function (err) {
      if (err) return console.error(err);
    });
  
  vas = {author:req.query.author, post: req.query.post};
  //res.render("home", {"loggedIn": req.query.name});

  res.send(vas);
}

// burger.getOrder = function(req, res){

//   var callback = function(req, res){
//     return function(err, ingredients){
//       if (err){
//         console.log('error occured');
//         return;
//       };
//       res.render("order", {"ingredients": ingredients});
//     };
//   }
//   ing.find(callback(req, res))
// };

// burger.getadd = function(req, res) {
//   newIng = new ing({name: req.query.name, stock: "true", price: req.query.price});
//     newIng.save(function (err) {
//       if (err) return console.error(err);
//     });
  
//   vas = {name:req.query.name, price: req.query.price}
//   res.send(vas);
// }

// burger.disable = function(req,res) {
//     ing.findOneAndRemove({name: req.query.name}, {name: req.query.name}, function(err, cats) {
//     if (err) {
//       res.status(500).send("Something broke!");
//       };
//     });
//   res.send(req.query.name);
// };

// burger.getdisable = function(req, res) {
//   //ing.Remove({name: req.query.name}, function(err, cats) {
//     ing.findOneAndRemove({name: req.query.name}, {name: req.query.name}, function(err, cats) {
//     if (err) {
//       res.status(500).send("Something broke!");
//       };
//     });
//   res.send(req.query.name);
// }

// burger.getedit = function(req,res) {
//   ing.update({name: req.query.name},{$set:{name: req.query.val, price: req.query.val2}}, function(err, cats) {
//     if (err) {
//       res.status(500).send("Something broke!");
//       };
//     });
//   var das = {name: req.query.name, val: req.query.val, val2: req.query.val2}
//   //res.send(req.query.val);
//   res.send(das);

// }

// burger.edit = function(req,res) {
//   ing.update({name: req.body.name},{$set:{name: req.body.val}}, function(err, cats) {
//   if (err) {
//       res.status(500).send("Something broke!");
//       };
//     });
//   var das = [req.query.name, req.query.val]
//   res.send(das);
//   //res.send(req.query.val);
// }

module.exports = twote;