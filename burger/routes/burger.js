// Doesn't look like you use these two
var express = require('express');
var router = express.Router();
var ing = require('../models/ingredientModel');
var ord = require('../models/orderModel')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/burger');
var db = mongoose.connection;
//mongoose.connect('mongodb://localhost/order');
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

burger.getOrder = function(req, res){

  var callback = function(req, res){
    return function(err, ingredients){
      if (err){
        console.log('error occured');
        return;
      };
      res.render("order", {"ingredients": ingredients});
    };
  }
  ing.find(callback(req, res))
};

burger.getadd = function(req, res) {
  newIng = new ing({name: req.query.name, stock: "true", price: req.query.price});
    newIng.save(function (err) {
      if (err) return console.error(err);
    });
  
  vas = {name:req.query.name, price: req.query.price}
  res.send(vas);
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

module.exports = burger;
