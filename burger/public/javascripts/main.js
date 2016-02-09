var $form1 = $("#ajax-form");
var $form2 = $("#ajax-form2");
var $form3 = $("#ajax-form3");
var $form4 = $("#ajax-form4");
var $form5 = $("#ajax-form5");
console.log("hello world");

var onSuccess = function(data, status) {
  $("#result").append("<div id='result'>"+data.name+": "+data.price+"$</div>");
};

var onSuccess2 = function(data, status) {
  $("button[name|='"+data+"']").prop('disabled', true);
};

var onSuccess3 = function(data, status) {
  //$("ul[id|='"+data[0]+"'").replaceWith("<ul id = {{"+data[1]+"}}>{{"+data[1]+"}}</ul>")
  //console.log("it ran");
  $("ul[id|='"+data.name+"']").replaceWith("<ul id='"+data.val+"'>"+data.val+": "+data.val2+"$</ul>")
  //$("ul[id|='ansm'").replaceWith("<ul> here comes data:"+data.val+" it was right there</ul>")
  //console.log("for real");
};

// var onSuccess4 = function(data, status) {
//   $("button[value|='oos2']").prop('disabled', true);
//   $("button[value|='Edit2']").prop('disabled', true);
//   $("input[name|='ingredient2']").prop('disabled', true);
//   $("input[name|='edit2']").prop('disabled', true);
// };

// var onSuccess5 = function(data, status) {
//   $("button[value|='oos2']").prop('disabled', true);
// };

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

// $form4.submit(function(event) {
//   event.preventDefault();
//   var mood = $form4.find("[name='custom']").val();
//   //var name = $form.find("[name='name']").val();
//   //linked to the app.js get call
//   $.get("disable", {
//     mood: mood//,
//     //name: name
//   })
//     .done(onSuccess4)
//     .error(onError);
// });

// $form5.submit(function(event) {
//   event.preventDefault();
//   var mood = $form5.find("[name='custom']").val();
//   //var name = $form.find("[name='name']").val();
//   //linked to the app.js get call
//   $.get("disable", {
//     mood: mood//,
//     //name: name
//   })
//     .done(onSuccess5)
//     .error(onError);
// });
