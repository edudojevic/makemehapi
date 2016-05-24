/*
Create a server which listens on a port passed from the command line, takes any
requests to the path /proxy and proxies them to http://localhost:65535/proxy.
*/

var Hapi = require('hapi');
var H2o2 = require('h2o2');
var server = new Hapi.Server();

// Register Vision module, used for rendering templates
server.register(H2o2, function(err) {
  if (err) throw err;
});

server.connection({
  host: '127.0.0.1',
  port: Number(process.argv[2] || 8080)
});

server.route({
  method: 'GET',
  path: '/proxy',
  handler: {
    proxy: {
      host: '127.0.0.1',
      port: 65535
    }
  }
});

server.start(function() {
  console.log('Server running at: ', server.info.uri);
});
