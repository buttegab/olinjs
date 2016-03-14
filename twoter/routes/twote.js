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
  // I see no reason to define a "sess" variable -- fine to work with req.session directly
  // Also, not sure how intentional this was: there were routes which used "sess" (something like console.log(sess.user))
  // *without* defining sess locally. Those references only worked out because, in various routes in this file, you
  // defined "sess" without "var" in front -- so, "sess" got scoped globally (to the whole file) instead of
  // locally (to just the route handler function). If you'd used "var sess = ..." every time you defined "sess", those routes which
  // use "sess" but *don't* define it would have thrown errors along the lines of "sess is undefined".
  req.session.username = "fuck";
  res.redirect('/');
};


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
  } // again with the indentation -- this should work out to be at the outermost level, if all of your curly braces match up (which it looks like they do)



twote.passLogin = function(req, res) {
  req.session.username = "fuck"; // I always find it funny to see what strings people use when debugging :)
  res.redirect('/');
};


// I'm getting confused in here with the spacing/bracketing inconsistencies -- organizing so I understand what's happening.
// It's also my personal preference to define callbacks inline as anonymous functions -- doing it that way because I find it easier to understand; you can decide what you prefer
// I'm really happy to hear that getting the async calls to work was gratifying :)
twote.getUsers = function(req, res){
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    req.session.cookie.expires = new Date(Date.now() + 60000); // can do this inline -- you never use time again

    usr.find(function(err, users) {
      if (err){
        // can do all on one line like this, if you want
        // also, error handling! 500 means "internal server error" -- usually pretty appropriate; you can look up other codes if you want
        return res.status(500).json(err);
      };

      // The second callback didn't need req and res as params the way your code was, and it still doesn't the way I've
      // organized things. req and res are defined in the scope of the route handler -- and that scope includes both callbacks!
      post.find({}, null, {sort: '-created'}, function(err, posts) {
        if (err){
          return res.status(500).json(err);
        };
        var results = {"user": users, "post": posts}
        res.render("home", {"result": results}); // Is the object-inside-an-object necessary?
      });
    });
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
  req.session.username = undefined;
  usr.update({logged: true},{$set:{logged: false}}, function(err, cats) { // ...cats? weird users you've got
    if (err) {-
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
