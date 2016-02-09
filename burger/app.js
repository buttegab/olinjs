var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var index = require('./routes/index');
var app = express();
var burger = require('./routes/burger');
var order = require('./routes/order');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', burger.getIngredients);
app.get('/add', burger.getadd);
app.get('/disable', burger.getdisable);
app.post('/disable', burger.disable);
app.get('/edit', burger.getedit);
app.post('/edit', burger.edit);
app.get('/order', burger.getOrder);
app.get('/orderdb', order.orderdb);
app.get('/kitchen', order.kitchen);
app.get('/totals', order.totals);
app.get('/complete', order.comp);


app.listen(3000);