// var request = require('supertest');
// var app = require('./../../app.js');
//You should test client side code here. 
describe("The app", function() {
  it('should return 200 OK on GET /', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        // Supertest lets us end tests this way...
        // (useful if we want to check a couple more things with chai)
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should respond with the correct html on GET /', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('Content-Length', '719', done); // ...or this way, inline!
  });

  it('should return 200 OK on GET /add', function(done) {
    request(app)
      .get('/add')
      .expect(200, done);
  });

  it('should return 200 OK on GET /disable', function(done) {
    request(app)
      .get('/disable')
      .expect(200, done);
  });
//Edit should not be tested this way simply because it currently has no way of dealing with empty calls to /edit.
  // it('should return 200 OK on GET /edit', function(done) {
  //   request(app)
  //     .get('/edit')
  //     .expect(200, done);
  // });
  it('should return 200 OK on GET /order', function(done) {
    request(app)
      .get('/order')
      .expect(200, done);
  });

  it('should respond with the correct html on GET /order', function(done) {
    request(app)
      .get('/order')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('Content-Length', '538', done); // ...or this way, inline!
  });

  it('should return 200 OK on GET /orderdb', function(done) {
    request(app)
      .get('/orderdb')
      .expect(200, done);
  });

  it('should return 200 OK on GET /kitchen', function(done) {
    request(app)
      .get('/kitchen')
      .expect(200, done);
  });

  it('should return 200 OK on GET /totals', function(done) {
    request(app)
      .get('/totals')
      .expect(200, done);
  });

  it('should return 200 OK on GET /complete', function(done) {
    request(app)
      .get('/complete')
      .expect(200, done);
  });




  it('should return 404 on GET /notaroute', function(done) {
    request(app)
      .get('/notaroute')
      .expect(404, done);
  });
});
