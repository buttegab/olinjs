var $form1 = $("#ajax-form");
var $form2 = $("#ajax-form2"); // more descriptive names, maybe? I have to go cross-reference the index.html file to figure out what these do
var $form3 = $("#ajax-form3");
var $form4 = $("#ajax-form4");
var $form5 = $("#ajax-form5");
console.log("hello world");

var onSuccess = function(data, status) {
  $("#result").append("<div id='result'> user "+data+" added.</div>");
};

var onSuccess2 = function(data, status) {
  //console.log(data[0].name)
  if (data.length != 0) {
    var z = "";
      for (var i = 0; i < data.length; i++) {
        z += data[i].name+' ';
      }
    //$("#user").replaceWith("<h3 id = 'user'>"+z+"</h3>")
    $("#user").replaceWith("<h3 id = '"+z+"'>"+z+"</h3>")

}
else {
  $("#user").replaceWith("<h3 id = 'user'> Please log in</h3>")
  $("button[value|='twote']").prop('disabled', true);

}

};

var onSuccess3 = function(data, status) {
  $("li[id|='logout']").replaceWith("<li id = 'logout'>user logged out</li>")
  //console.log("worked")
};

var onSuccess4 = function(data, status) {
  // Check out https://jsfiddle.net/swalters4925/e8gzd6h9/1/ for the way I like to add structured HTML to a page -- it's an option!
  $("li[id|='posts']").prepend("<li id = '"+data.author+"'>post: "+data.author+" posted: "+data.post+"</li>")
  console.log(data.post)

};

var onSuccess5 = function(data, status) {
  //$("button[value|='"+data.post+"']").prop('disabled', true);
  $("button[value|='"+data.post+"']").hide();
  $("ul[name|='"+data.post+"']").replaceWith("");

};

// var onSuccess6 = function(data, status) {
//   $("button[name|='"+data+"']").prop('disabled', true);
// };

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form1.submit(function(event) {
  event.preventDefault();
  var data = "name="+ $form1.find("[type='text']").val();
  var request = new XMLHttpRequest();
  request.open('POST', '/login', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
  var name = $form1.find("[type='text']").val();

  console.log(name);
  $.get("newUser", {
    name: name
  })
    .done(onSuccess)
    .error(onError);
});




$("input[name|='twote']").on("click", function(){
  $.get("getLogged")
  .done(onSuccess2)
  .error(onError);
});


$form2.submit(function(event) {
  event.preventDefault();
  //var name = $form1.find("[type='submit']").val();

  //console.log(name);
  $.get("logout", {
    name: name
  })
    .done(onSuccess3)
    .error(onError);
});

$("button[value|='twote']").on("click",function(event) {
  event.preventDefault();
  //var name = $form1.find("[type='submit']").val();
  //var author = $("h3[id|='user']").val();
  var author = $("h3").attr("id");

  var post = $("input[name|='twote']").val();
  //console.log("clicked!")
  console.log("this"+author);
  $.get("addPost", {
    author: author,
    post: post
  })
    .done(onSuccess4)
    .error(onError);
});


$("button[id|='remove']").on("click",function(event) {
  event.preventDefault();
  //var name = $form1.find("[type='submit']").val();
  //var author = $("h3[id|='user']").val();
  var author = $(this).attr("name");
  var post = $(this).attr("value");
  console.log("I tried"); // yes indeed!
  console.log(author);
  console.log(post);
  //var post = $("input[name|='twote']").val();
  //console.log("clicked!")
  //console.log("this"+author);

  $.get("removePost", {
    author: author,
    post: post
  })
    .done(onSuccess5)
    .error(onError);
});

// $form1.submit(function(event) {
//   var data = "name="+ $form1.firstElementChild.value;
//   var request = new XMLHttpRequest();
//   request.open('POST', '/login', true);
//   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//   request.send(data);
// })



// $(document).on("pagecontainerload",function(){
//   alert("pagecontainerload event fired!");
// });

//form is the home.handlebars form done
// $("button[value|='oos']").click(function(event) {
//   event.preventDefault();
//   //var mood = $form2.find("[name=this.name]").val();
//   var name = $(this).attr("name");
//   //linked to the app.js get call
//   $.get("disable", {
//     name: name//,
//     //name: name
//   })
//     .done(onSuccess2)
//     .error(onError);
// });

// $("button[value|='Edit1']").click(function(event) {
//   event.preventDefault();
//   var name = $(this).attr("name");
//   //var id = $(this).attr("id");
//   //var val = $form2.find("[name='text']").val();
//   //$( "input:text" )
//   //var val = $( "input[name='"+name+"']" ).val();
//   var val = $form2.find( "input[name='"+name+"']" ).val();
//   var val2 = $form2.find( "input[id='"+name+"']" ).val();
//   console.log(val);
//   console.log(val2);
//   console.log(name);
//   console.log("above");

//   $.get("edit", {
//     name: name,
//     val: val,
//     val2: val2
//   })
//     .done(onSuccess3)
//     .error(onError);
// });

// $form3.submit(function(event) {
//   event.preventDefault();
//   var allVals = [];
//   var allPrice = 0;
//   $form3.find("input:checked").each(function() {
//     //allVals.push($(this).text());
//     allVals.push($(this).attr("name"));
//   });
//   $form3.find("input:checked").each(function() {
//     //allVals.push($(this).text());
//     allPrice += Number($(this).attr("id"));
//   });
//   //for (var i = 0; i< $form3.find("input:checked").length; i++ )
//     //$( "input:checked" ).length
//   //var checked = $form3.find("input:checked");
//   console.log(allVals);
//   console.log(allPrice);
//   var checked = allVals;
//   //var name = $form.find("[name='name']").val();
//   //linked to the app.js get call
//   $.get("orderdb", {
//     checked: checked,
//     allPrice: allPrice
//   })
//     .done(onSuccess4)
//     .error(onError);
// });


// $("input[type=checkbox]").click(function(event) {
//   //event.preventDefault();
//   console.log("tried");
//   var total = 0;
//   $form3.find("input:checked").each(function() {
//     //allVals.push($(this).text());
//     total += Number($(this).attr("id"));
//   });
// $.get("totals", {
//     total: total
//   })
//     .done(onSuccess5)
//     .error(onError);
// });


// $("button[value|='Complete']").click(function(event) {
// //$form4.submit(function(event) {
//   event.preventDefault();
//   //var name = $form4.find( "button[type='submit']" ).attr("name");
//   var name = $(this).attr("name");
//   console.log(name);
//   $.get("complete", {
//     name: name
//   })
//     .done(onSuccess6)
//     .error(onError);
// });


