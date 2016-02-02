var express = require('express');
var router = express.Router();
var cat = require('../models/catModel');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var catapp = {}


//working
catapp.getCats = function(req, res){
//get all lizard names

  var callback = function(req, res){
    return function(err, cats){
      if (err){
        console.log('error occured');
        return;
      }
      res.render("viewCats", {"cats": cats});
    }
  }
  cat.find(callback(req, res))
}



//working
catapp.add = function(req, res){
// create new lizard named Bob  

  var name = '';
  var color = '';
  var age = Math.floor(Math.random() * (100 - 1)) + 1;
  var names = ['bart', 'heath', 'nuget'];
  var colors = ['red', 'blue', 'yellow', 'green']
  //var randn = Math.floor(Math.random() * (3 - 0)) + 0;
  var randn = Math.floor(Math.random() * 3);
  var randc = Math.floor(Math.random() * 4);
  name += names[randn]
  color += colors[randc]
  fluffy = new cat({name: name, age: age, color: color});
  //var newCat = catapp.Cat(name, age, color);
  fluffy.save(function (err) {
    if (err) return console.error(err);
  });
  //db.add(newCat);
  res.render("add", fluffy
  );
};
//working
catapp.remove = function(req, res) {
  cat.findOneAndRemove({}, {sort: {age: -1}}, function(err, cats) {
    if (err) {
      res.status(500).send("Something broke!");
    } else {
        var oldcat = cats.name;
        var oldage = cats.age
        res.render("remove", {"cats": [
        {name: oldcat, age: oldage}]
        });
      };
    });
  };





catapp.sortedy = function(req, res) {
    var callback = function(req, res){
    return function(err, cats){
      if (err){
        console.log('error occured');
        return;
      }

      var tot = []
      for (var i = 0; i < cats.length; i++) {
        tot.push(cats[i]) }
      tot = tot.sort(function(a,b){return a.age - b.age})
      res.render("sorted", {"cats": tot});
    }   
  }
  cat.find({ 'color': 'yellow' }, 'name age color', callback(req, res))

}

catapp.sortedb = function(req, res) {
    var callback = function(req, res){
    return function(err, cats){
      if (err){
        console.log('error occured');
        return;
      }

      var tot = []
      for (var i = 0; i < cats.length; i++) {
        tot.push(cats[i]) }
      tot = tot.sort(function(a,b){return a.age - b.age})
      res.render("sorted", {"cats": tot});
    }   
  }
  cat.find({ 'color': 'blue'}, 'name age color', callback(req, res))

}
//sorts for blue and bart named cats
catapp.sortedbb = function(req, res) {
    var callback = function(req, res){
    return function(err, cats){
      if (err){
        console.log('error occured');
        return;
      }

      var tot = []
      for (var i = 0; i < cats.length; i++) {
        tot.push(cats[i]) }
      tot = tot.sort(function(a,b){return a.age - b.age})
      res.render("sorted", {"cats": tot});
    }   
  }
  cat.find({ 'color': 'blue', 'name': 'bart'}, 'name age color', callback(req, res))

}


catapp.sortedg = function(req, res) {
    var callback = function(req, res){
    return function(err, cats){
      if (err){
        console.log('error occured');
        return;
      }

      var tot = []
      for (var i = 0; i < cats.length; i++) {
        tot.push(cats[i]) }
      tot = tot.sort(function(a,b){return a.age - b.age})
      res.render("sorted", {"cats": tot});
    }   
  }
  cat.find({ 'color': 'green' }, 'name age color', callback(req, res))

}

catapp.sortedr = function(req, res) {
    var callback = function(req, res){
    return function(err, cats){
      if (err){
        console.log('error occured');
        return;
      }

      var tot = []
      for (var i = 0; i < cats.length; i++) {
        tot.push(cats[i]) }
      tot = tot.sort(function(a,b){return a.age - b.age})
      res.render("sorted", {"cats": tot});
    }   
  }
  cat.find({ 'color': 'red' }, 'name age color', callback(req, res))

}


module.exports = catapp;