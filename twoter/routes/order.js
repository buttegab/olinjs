var express = require('express');
var router = express.Router();
var ord = require('../models/orderModel')
var mongoose = require('mongoose');

var order = {}

order.orderdb = function(req,res) {
  newOrd = new ord({name: req.query.checked, price: req.query.allPrice});
  newOrd.save(function (err) {
      if (err) return console.error(err);
    });
  
  vas = {name:req.query.checked, price: req.query.allPrice};
  res.send(vas);
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
}

order.totals = function(req,res) {
	res.send(req.query.total)
}

order.comp = function(req, res) {

    ord.findOneAndRemove({_id: req.query.name}, {_id: req.query.name}, function(err, cats) {
    if (err) {
      res.status(500).send("Something broke!");
      };
    });
  res.send(req.query.name);
}



module.exports = order;