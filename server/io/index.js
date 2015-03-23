'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

	io.on('connection',function(client){
		console.log("client connected");

		client.on('location',function(data){
			client.geo_location = data;
		});

		client.on('createRoom',function(data){
			console.log(data);
			client.join(data.name);
			// var nsp = io.of(data.name);
			// nsp.on('connection', function(socket){
			//   console.log('someone connected')

			// });
			// nsp.emit('hi', 'everyone!');
		});

		client.on('join_room',function(data){
			client.join(data.name);
		})
		

		client.on('disconnect',function(){
			console.log("client disconnected");
		});
	});
};