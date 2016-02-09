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

  var callback = function(req, res){
    return function(err, ingredients){
      if (err){
        console.log('error occured');
        return;
      };
      res.render("home", {"ingredients": ingredients});
    };
  }
  ing.find(callback(req, res))
};



// burger.add = function(req, res) {
//   if (req.xhr) {
//     newIng = new ing({name: req.body.name, stock: "true"});
//     newIng.save(function (err) {
//       if (err) return console.error(err);
//     });
//     res.send(req.body.name);
//   }
// };

burger.getadd = function(req, res) {
  newIng = new ing({name: req.query.name, stock: "true", price: req.query.price});
    newIng.save(function (err) {
      if (err) return console.error(err);
    });
  
  vas = {name:req.query.name, price: req.query.price}
  res.send(vas);
  //res.send(req.query.name);
  //res.render("home", {"ingredients": newIng.name});
}

burger.disable = function(req,res) {
    ing.findOneAndRemove({name: req.query.name}, {name: req.query.name}, function(err, cats) {
    if (err) {
      res.status(500).send("Something broke!");
      };
    });
  res.send(req.query.name);
};

burger.getdisable = function(req, res) {
  //ing.Remove({name: req.query.name}, function(err, cats) {
    ing.findOneAndRemove({name: req.query.name}, {name: req.query.name}, function(err, cats) {
    if (err) {
      res.status(500).send("Something broke!");
      };
    });
  res.send(req.query.name);
}

burger.getedit = function(req,res) {
  ing.update({name: req.query.name},{$set:{name: req.query.val, price: req.query.val2}}, function(err, cats) {
    if (err) {
      res.status(500).send("Something broke!");
      };
    });
  var das = {name: req.query.name, val: req.query.val, val2: req.query.val2}
  //res.send(req.query.val);
  res.send(das);

}

burger.edit = function(req,res) {
  ing.update({name: req.body.name},{$set:{name: req.body.val}}, function(err, cats) {
  if (err) {
      res.status(500).send("Something broke!");
      };
    });
  var das = [req.query.name, req.query.val]
  res.send(das);
  //res.send(req.query.val);
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


