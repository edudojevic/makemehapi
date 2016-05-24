/*
  Create a server which responds to requests to /?name=Handling using a template
  located at templates/index.html which outputs the following HTML:

      <html>
          <head><title>Hello Handling</title></head>
          <body>
              Hello Handling
          </body>
      </html>
*/

var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');
var Vision = require('vision');
var server = new Hapi.Server();

// Register Inert module, used for reading static files
server.register(Inert, function (err) {
  if (err) throw err;
});

// Register Vision module, used for rendering templates
server.register(Vision, function(err) {
  if (err) throw err;
});

server.connection({
  host: '127.0.0.1',
  port: Number(process.argv[2] || 8080)
});

server.route({
  method: 'GET',
  path: '/',
  handler: {
    view: "index.html"
  }
});

server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, 'templates')
});

server.start(function() {
  console.log('Server running at: ', server.info.uri);
});
