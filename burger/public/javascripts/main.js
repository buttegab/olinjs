// You can come up with more descriptive names
var $form1 = $("#ajax-form");
var $form2 = $("#ajax-form2");
var $form3 = $("#ajax-form3");
var $form4 = $("#ajax-form4");
var $form5 = $("#ajax-form5");
console.log("hello world");

// And better here too
var onSuccess = function(data, status) {
  $("#result").append("<div id='result'>"+data.name+": "+data.price+"$</div>");
};

var onSuccess2 = function(data, status) {
  $("button[name|='"+data+"']").prop('disabled', true);
};

var onSuccess3 = function(data, status) {
  $("ul[id|='"+data.name+"']").replaceWith("<ul id='"+data.val+"'>"+data.val+": "+data.val2+"$</ul>")
};

var onSuccess4 = function(data, status) {
  console.log(data.name);
  console.log(data.price);
};

var onSuccess5 = function(data, status) {
  $("ul[id|='total']").replaceWith("<ul id='total'>Total: "+data+"$</ul>")
};

var onSuccess6 = function(data, status) {
  $("button[name|='"+data+"']").prop('disabled', true);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};
//done
$form1.submit(function(event) {
  event.preventDefault();
  var name = $form1.find("[name='custom']").val();
  var price = $form1.find("[name='customPrice']").val();
  //var price = 10
  console.log(name);
  console.log(price);
  //var name = $form.find("[name='name']").val();
  $.get("add", {
    name: name,
    price: price
  })
    .done(onSuccess)
    .error(onError);
});
//form is the home.handlebars form done
$("button[value|='oos']").click(function(event) {
  event.preventDefault();
  //var mood = $form2.find("[name=this.name]").val();
  var name = $(this).attr("name");
  //linked to the app.js get call
  $.get("disable", {
    name: name//,
    //name: name
  })
    .done(onSuccess2)
    .error(onError);
});

$("button[value|='Edit1']").click(function(event) {
  event.preventDefault();
  var name = $(this).attr("name");
  //var id = $(this).attr("id");
  //var val = $form2.find("[name='text']").val();
  //$( "input:text" )
  //var val = $( "input[name='"+name+"']" ).val();
  var val = $form2.find( "input[name='"+name+"']" ).val();
  var val2 = $form2.find( "input[id='"+name+"']" ).val();
  console.log(val);
  console.log(val2);
  console.log(name);
  console.log("above");
  //val = "it failed"
  //linked to the app.js get call
  $.get("edit", {
    name: name,
    val: val,
    val2: val2
  })
    .done(onSuccess3)
    .error(onError);
});

$form3.submit(function(event) {
  event.preventDefault();
  var allVals = [];
  var allPrice = 0;
  $form3.find("input:checked").each(function() {
    //allVals.push($(this).text());
    allVals.push($(this).attr("name"));
  });
  $form3.find("input:checked").each(function() {
    //allVals.push($(this).text());
    allPrice += Number($(this).attr("id"));
  });
  //for (var i = 0; i< $form3.find("input:checked").length; i++ )
    //$( "input:checked" ).length
  //var checked = $form3.find("input:checked");
  console.log(allVals);
  console.log(allPrice);
  var checked = allVals;
  //var name = $form.find("[name='name']").val();
  //linked to the app.js get call
  $.get("orderdb", {
    checked: checked,
    allPrice: allPrice
  })
    .done(onSuccess4)
    .error(onError);
});


$("input[type=checkbox]").click(function(event) {
  //event.preventDefault();
  console.log("tried");
  var total = 0;
  $form3.find("input:checked").each(function() {
    //allVals.push($(this).text());
    total += Number($(this).attr("id"));
  });
$.get("totals", {
    total: total
  })
    .done(onSuccess5)
    .error(onError);
});


$("button[value|='Complete']").click(function(event) {
//$form4.submit(function(event) {
  event.preventDefault();
  //var name = $form4.find( "button[type='submit']" ).attr("name");
  var name = $(this).attr("name");  
  console.log(name);
  $.get("complete", {
    name: name
  })
    .done(onSuccess6)
    .error(onError);
});


