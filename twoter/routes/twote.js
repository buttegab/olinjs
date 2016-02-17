var express = require('express');
var router = express.Router();
var usr= require('../models/userModel');
var post = require('../models/postModel')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twote');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var twote = {}

twote.postLogin = function(req, res) {
  sess = req.session;
  var sess = req.session;
  sess.username = "fuck";
  res.redirect('/'); 
}


twote.logFor = function(accessToken, refreshToken, profile, done) {
    usr.findOne({ oauthID: profile.id }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new usr({
          name: profile.displayName,
          logged: true
        });
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }



twote.passLogin = function(req, res) {

  var sess = req.session;
  sess.username = "fuck";
  // sess.username = req.query.name;
  console.log(sess.username);
  res.redirect('/'); 
}


// //working
twote.getUsers = function(req, res){
   // var sess = req.session;
   sess = req.session;

   console.log(sess);
   if (!sess.username) {
     console.log("only this");
     res.redirect("/login");
   }
else {
  var time = new Date(Date.now() + 60000);
  sess.cookie.expires = time;
  console.log("also this");
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
}
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
  

  res.send(req.query.name);
}

twote.logout = function(req,res) {
  sess.username = undefined;
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

twote.removePost = function(req, res) {
  //ing.Remove({name: req.query.name}, function(err, cats) {
  var log = false;

  var callback = function(req, res){
    return function(err, users){
      if (err){
        console.log('error occured');
        return;
      };
      //res.render("login", {"user": users});

    for (var i = 0; i < users.length; i++){
      if(users[i].name == req.query.author) {
        log = true;
      }
  }

  if(log == true) { 
    post.findOneAndRemove({post: req.query.post}, {author: req.query.author}, function(err, cats) {
    if (err) {
      res.status(500).send("Something broke!");
      };
    });
  vas = {author:req.query.author, post: req.query.post};
  res.send(vas);
  }
}

//end
    };
    usr.find({ 'logged': true },callback(req, res))
  }
  


module.exports = twote;