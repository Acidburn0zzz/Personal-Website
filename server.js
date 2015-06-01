/**
* Dependencies.
*/
var Hapi = require('hapi'),
	Path = require('path');


// Create a new server
var server = new Hapi.Server();


// Setup the server with a host and port
server.connection({
	host: process.env.HOST || "localhost",
	port: process.env.PORT || "1234"
});


// Setup the views engine and folder
server.views({
	engines: {
		html: require('swig')
	},
	relativeTo: __dirname,
	path: './views',
	layoutPath: './views/layouts',
	partialsPath: './views/partials',
	layout: 'default',
	isCached: process.env.NODE_ENV === 'production'
});


// Export the server to be required elsewhere.
module.exports = server;


// Routes
server.route({
	method: 'GET',
	path: '/',
	handler: function (request, reply) {
		reply('Hello, Zaahir!');
	}
});


//  Logging
server.register({
	register: require('good'),
	options: {
		reporters: [{
			reporter: require('good-console'),
			events: {
				response: '*',
				log: '*'
			}
		}]
	}
}, function (err) {
	if (err) {
		throw err; // something bad happened loading the plugin
	}

	server.start(function () {
		server.log('info', 'Server running at: ' + server.info.uri);
	});
});
