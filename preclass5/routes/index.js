var home = function(req, res){
  res.render("home", {"classes": [
  {name:"Olin.js", teacher:"Ninjas"},
  {name:"UOCD", teacher:"A lot of people"},
  {name:"Discrete", teacher:"Rihana"},
  {name:"Data Science", teacher:"PAAAAAAAAAAAAAAAAAAUL"}]
});
};

module.exports.home = home;


