var loopback = require('loopback');
var boot = require('loopback-boot');
// var explorer = require('loopback-component-explorer');  // Module was loopback-explorer in v. 2.0.1 and earlier

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(8000, function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// app.use('/explorer', explorer.routes(app, {}));
app.use('/api', loopback.rest());
app.enableAuth();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
