var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
// clean up the dependencies you're not using!
// also, run `npm init` when you start so you have a `package.json` file --
// that way, when you run `npm install --save whatever` the dependency info will
// end up in the `package.json`, and people who work on/give you feedback on your app
// will be able to run just `npm install` to get all of your dependencies in the same form you have them.
var app = express();
var session = require('express-session')
var twote = require('./routes/twote');
var passport = require('passport');
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;



passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  }, twote.logFor));






app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));




app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'superS3CRE7',
  resave: false,
  saveUninitialized: false ,
  cookie: {}
}));

app.get('/', twote.getUsers);
app.get('/login', twote.login);
app.get('/newUser', twote.addUser); // technically this should be a post -- changes the server/database state
app.get('/logout', twote.logout);
app.get('/getLogged', twote.getLogged);
app.get('/addPost', twote.addPost); // technically this should be a post
app.get('/removePost', twote.removePost); // technically this should be a post
app.post('/login', twote.postLogin);

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  twote.passLogin);



app.listen(3000);
