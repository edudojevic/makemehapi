var Hapi = require('hapi');
var Inert = require('inert');
var server = new Hapi.Server();

// Register Inert module to server
server.register(Inert, function (err) {
  if (err) throw err;
})

server.connection({
  host: '127.0.0.1',
  port: Number(process.argv[2] || 8080)
});

server.route({
  method: 'GET',
  path: '/',
  handler: {
    file: "exercise3_index.html"
  }
});

server.start(function() {
  console.log('Server running at: ', server.info.uri);
});
