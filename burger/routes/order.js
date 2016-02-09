var express = require('express');
var router = express.Router();
//var ing = require('../models/ingredientModel');
var ord = require('../models/orderModel')
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/order');
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

var order = {}

order.orderdb = function(req,res) {
  newOrd = new ord({name: req.query.checked, price: req.query.allPrice});
  newOrd.save(function (err) {
      if (err) return console.error(err);
    });
  
  vas = {name:req.query.checked, price: req.query.allPrice};
  res.send(vas);

  //res.send("complete");
}

order.kitchen = function(req,res) {
  var callback = function(req, res){
    return function(err, orders){
      if (err){
        console.log('error occured');
        return;
      };
      res.render("kitchen", {"orders": orders});
    };
  }
  ord.find(callback(req, res))
  //res.send("complete");
}

order.totals = function(req,res) {
	res.send(req.query.total)
}
module.exports = order;