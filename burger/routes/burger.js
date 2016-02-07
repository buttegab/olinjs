var express = require('express');
var router = express.Router();
var ing = require('../models/ingredientModel');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/burger');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var burger = {}


// //working
burger.getIngredients = function(req, res){
//get all lizard names

  var callback = function(req, res){
    return function(err, cats){
      if (err){
        console.log('error occured');
        return;
      };
      res.render("viewCats", {"cats": cats});
    };
  }
  ing.find(callback(req, res))
};



burger.add = function(req, res) {
  if (req.xhr) {
    newIng = new ing({name: req.body.name});
    newIng.save(function (err) {
      if (err) return console.error(err);
    });
    res.send(req.body.name);
  }
};

burger.getadd = function(req, res) {
  res.send(req.query.name);
}

burger.disable = function(req,res) {
  if (req.xhr) {
    res.send("done");
  } else {
    return
  }
};

burger.getdisable = function(req, res) {
  res.send("done");
}

//working
// burger.add = function(req, res){
// // create new lizard named Bob  

//   //switch (req.query.value) {
//   //case "lettuce":
//     //imageLocation = absolute ? path.join(__dirname,"../public/", happyCat) : happyCat;
//   //  break;
//   //case "tomato":
  

//   if (req.xhr) {
//     res.send(req.query);
//   } else {
//       res.sendFile(req.query);
  

//   //}
//   //  break;
//   }


//   // fluffy = new cat({name: name, age: age, color: color});
//   // fluffy.save(function (err) {
//   //   if (err) return console.error(err);
//   // });
//   // //db.add(newCat);
//   // res.render("add", fluffy
//   // );
// };
//};
//working
// burger.remove = function(req, res) {
//   cat.findOneAndRemove({}, {sort: {age: -1}}, function(err, cats) {
//     if (err) {
//       res.status(500).send("Something broke!");
//     } else {
//         var oldcat = cats.name;
//         var oldage = cats.age
//         res.render("remove", {"cats": [
//         {name: oldcat, age: oldage}]
//         });
//       };
//     });
//   };





// burger.sortedy = function(req, res) {
//     var callback = function(req, res){
//     return function(err, cats){
//       if (err){
//         console.log('error occured');
//         return;
//       }

//       var tot = []
//       for (var i = 0; i < cats.length; i++) {
//         tot.push(cats[i]) }
//       tot = tot.sort(function(a,b){return a.age - b.age})
//       res.render("sorted", {"cats": tot});
//     }   
//   }
//   cat.find({ 'color': 'yellow' }, 'name age color', callback(req, res))

// }


// burger.sortedbb = function(req, res) {
//     var callback = function(req, res){
//     return function(err, cats){
//       if (err){
//         console.log('error occured');
//         return;
//       }

//       var tot = []
//       for (var i = 0; i < cats.length; i++) {
//         tot.push(cats[i]) }
//       tot = tot.sort(function(a,b){return a.age - b.age})
//       res.render("sorted", {"cats": tot});
//     }   
//   }
//   cat.find({ 'color': 'blue', 'name': 'bart'}, 'name age color', callback(req, res))

// }




module.exports = burger;


