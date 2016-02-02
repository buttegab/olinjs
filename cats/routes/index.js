var index = {};
//var catApp = require("./catApp")
var db = require('../fakeDatabase');

index.home = function(req, res){
  //catApp.getCats()
  res.render("home", {"links": [
  {link: "/"},
  {link: "/show"},
  {link: "/add"},
  {link: "/remove"},
  {link: "/sorty"},
  {link: "/sortb"},
  {link: "/sortr"},
  {link: "/sortg"},
  {link: "/sortbb"}]
});
};
//var getAll = function(req, res, next){


// index.home = function(req, res){
// 	var cats = db.getAll();
//     var msg = "Cat names are: ";
//     cats.forEach(function(liz){
//       msg = msg + liz.name + ",";
//     })
//     res.render("home", msg);
//   };
  


index.add = function(req, res){
	res.render("add", {"classes": [
	{name: "bark"}]
});
};

index.remove = function(req, res){
	res.render("remove", {"classes": [
	{name: "bark"}]
});
};

module.exports = index;

