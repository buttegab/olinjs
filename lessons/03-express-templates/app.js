// var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var app = express();

// app.get('/', function(req, res){
//   res.send('hello world');
// });

// app.get('/olin', function(req, res){
// 	res.send('hello olin');
// });

// app.listen(3000);
var express = require('express');
var index = require('./routes/index');
var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);

app.listen(3000);