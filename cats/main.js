var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var index = require('./routes/index');
var app = express();
var cats = require('./routes/catApp');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/add', cats.add);
app.get('/remove', cats.remove);
app.get('/show', cats.getCats);
app.get('/sorty', cats.sortedy);
app.get('/sortg', cats.sortedg);
app.get('/sortb', cats.sortedb);
app.get('/sortbb', cats.sortedbb);
app.get('/sortr', cats.sortedr);

app.listen(3000);