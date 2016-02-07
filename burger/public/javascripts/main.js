var $form1 = $("#ajax-form");
var $form2 = $("#ajax-form2");
var $form3 = $("#ajax-form3");
var $form4 = $("#ajax-form4");
var $form5 = $("#ajax-form5");
console.log("hello world");
var onSuccess = function(data, status) {
  $("#result").append("<div id='result'>"+data+"</div>");
};

var onSuccess2 = function(data, status) {
  $("button[value|='oos1']").prop('disabled', true);
  $("button[value|='Edit1']").prop('disabled', true);
  $("input[name|='ingredient1']").prop('disabled', true);
  $("input[name|='edit1']").prop('disabled', true);
};

var onSuccess3 = function(data, status) {
  //$("button[value|='oos1']").prop('disabled', true);
  $("li[id|='a1'").replaceWith('<li id = a1><input type="checkbox" name="ingredient1" value="lettuce"/>'+data+'<button type="submit" value="oos1">Out of Stock</button>')
};

var onSuccess4 = function(data, status) {
  $("button[value|='oos2']").prop('disabled', true);
  $("button[value|='Edit2']").prop('disabled', true);
  $("input[name|='ingredient2']").prop('disabled', true);
  $("input[name|='edit2']").prop('disabled', true);
};

var onSuccess5 = function(data, status) {
  $("button[value|='oos2']").prop('disabled', true);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};
//done
$form1.submit(function(event) {
  event.preventDefault();
  var name = $form1.find("[name='custom']").val();
  //var name = $form.find("[name='name']").val();
  $.get("add", {
    name: name//,
    //name: name
  })
    .done(onSuccess)
    .error(onError);
});
//form is the home.handlebars form done
$form2.submit(function(event) {
  event.preventDefault();
  var mood = $form2.find("[name='custom']").val();
  //var name = $form.find("[name='name']").val();
  //linked to the app.js get call
  $.get("disable", {
    mood: mood//,
    //name: name
  })
    .done(onSuccess2)
    .error(onError);
});

$form3.submit(function(event) {
  event.preventDefault();
  var mood = $form3.find("[name='edit1']").val();
  //var name = $form.find("[name='name']").val();
  //linked to the app.js get call
  $.get("add", {
    mood: mood//,
    //name: name
  })
    .done(onSuccess3)
    .error(onError);
});

$form4.submit(function(event) {
  event.preventDefault();
  var mood = $form4.find("[name='custom']").val();
  //var name = $form.find("[name='name']").val();
  //linked to the app.js get call
  $.get("disable", {
    mood: mood//,
    //name: name
  })
    .done(onSuccess4)
    .error(onError);
});

$form5.submit(function(event) {
  event.preventDefault();
  var mood = $form5.find("[name='custom']").val();
  //var name = $form.find("[name='name']").val();
  //linked to the app.js get call
  $.get("disable", {
    mood: mood//,
    //name: name
  })
    .done(onSuccess5)
    .error(onError);
});
