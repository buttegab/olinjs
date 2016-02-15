var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var index = require('./routes/index');
var app = express();
var session = require('express-session')
var twote = require('./routes/twote');
// var skeleton = require('./views/css/skeleton.css');
// var normalize = require('./views/css/normalize.css');






app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(cookieParser());
// app.use(session());
//app.use(app.router);

//app.use(express.cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({ 
  secret: 'superS3CRE7',
  resave: false,
  saveUninitialized: false ,
  cookie: {}
}));

app.get('/', twote.getUsers);
app.get('/login', twote.login);
app.get('/newUser', twote.addUser)
app.get('/logout', twote.logout)
app.get('/getLogged', twote.getLogged)
app.get('/addPost', twote.addPost)
app.get('/removePost', twote.removePost)
// app.get('/disable', burger.getdisable);
//app.post('/disable', burger.disable);
// app.get('/edit', burger.getedit);
// app.post('/edit', burger.edit);
// app.get('/order', burger.getOrder);
// app.get('/orderdb', order.orderdb);
// app.get('/kitchen', order.kitchen);
// app.get('/totals', order.totals);
// app.get('/complete', order.comp);


app.listen(3000);