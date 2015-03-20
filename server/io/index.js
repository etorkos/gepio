'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

	io.on('connection',function(client){
		console.log("client connected")

		client.emit('messages',"socket.io connection established");

		client.on('join',function(data){
			console.log(data);
		});

		client.on('disconnect',function(){
			console.log("client disconnected");
		});
	});
};