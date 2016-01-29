var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');

var catapp = {}

//function that constructs and returns lizard object
catapp.Cat = function(name, age, color){
  var cat = {
    name: name,
    age: age,
    color: color
  };
  return cat;
}
catapp.getCats = function(req, res){
//get all lizard names
    var cats = db.getAll();
    var msg = "Cats: ";
    var catAge = cats.sort(function(a,b){return a.age - b.age});
    catAge.forEach(function(liz){
      msg = msg + "name: " + liz.name + "," + " age: " + liz.age + "," + " color: " + liz.color + "| ";
    })
    res.render("viewCats", {"cats": [
    {name: msg}]
    });
 };

catapp.add = function(req, res){
// create new lizard named Bob   
  var name = '';
  var color = '';
  var age = Math.floor(Math.random() * (100 - 1)) + 1;
  var names = ['bart', 'heath', 'nuget'];
  var colors = ['red', 'blue', 'yellow', 'green']
  var randn = Math.floor(Math.random() * (3 - 0)) + 0;
  var randc = Math.floor(Math.random() * (4 - 0)) + 0;
  name += names[randn]
  color += colors[randc]
  var newCat = catapp.Cat(name, age, color);
  db.add(newCat);
  res.render("add", newCat
  );
};

catapp.remove = function(req, res) {
  catName = db.data[db.data.length-1].name
  db.remove(db.data.length-1);
  res.render("remove", {"cats": [
   {name: catName}]
 });
};

catapp.sortedy = function(req, res) {
  var sortCats = db.getAll();
  var colored = [];
  for (var i = 0; i < sortCats.length; i++) {
    if (sortCats[i].color == 'yellow') {
      colored.push(sortCats[i]);
    }
  }
  //var sortCats = sortCats.sort(function(a,b){return a.color - b.color})
  //var keysSorted = sortCats.sort(function(a,b){return a.age - b.age});
  var keysSorted = colored.sort(function(a,b){return a.age - b.age});

  res.send(keysSorted);
  //res.render("sorted", keysSorted);
};

catapp.sortedr = function(req, res) {
  var sortCats = db.getAll();
  var colored = [];
  for (var i = 0; i < sortCats.length; i++) {
    if (sortCats[i].color == 'red') {
      colored.push(sortCats[i]);
    }
  }
  //var sortCats = sortCats.sort(function(a,b){return a.color - b.color})
  //var keysSorted = sortCats.sort(function(a,b){return a.age - b.age});
  var keysSorted = colored.sort(function(a,b){return a.age - b.age});

  res.send(keysSorted);
  //res.render("sorted", keysSorted);

};

catapp.sortedg = function(req, res) {
  var sortCats = db.getAll();
  var colored = [];
  for (var i = 0; i < sortCats.length; i++) {
    if (sortCats[i].color == 'green') {
      colored.push(sortCats[i]);
    }
  }
  var keysSorted = colored.sort(function(a,b){return a.age - b.age});


  res.send(keysSorted);
};

catapp.sortedb = function(req, res) {
  var sortCats = db.getAll();
  var colored = [];
  for (var i = 0; i < sortCats.length; i++) {
    if (sortCats[i].color == 'blue') {
      colored.push(sortCats[i]);
    }
  }
  var keysSorted = colored.sort(function(a,b){return a.age - b.age});

  res.send(keysSorted);
  //res.("sorted", keysSorted);
};



module.exports = catapp;