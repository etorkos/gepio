'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {
	var namespaces = [];

    if (io) return io;

    io = socketio(server);

	io.on('connection',function(client){
		console.log("client connected");

		client.on('location',function(data){
			client.geo_location = data;
		});


		// client.on('create_room',function(data){
		// 	// console.log(data);
		// 	var nsp = io.of('/'+data.room_name)
		// 	namespaces.push(nsp);
		// 	// console.log(namespaces);
		// 	  nsp.on('message',function(thing){
		// 	  	console.log(thing, "from nsp");
		// 	  });
		// 	nsp.on('connection', function(client_in_nsp){
		// 	  console.log('someone connected to' + data.room_name);

		// 	});
		// 	nsp.emit('hi', 'everyone!');
		// });

		client.on('join_room',function(room_name){
			client.room = room_name;
			client.join(client.room);
		});

		client.on('message',function(data){
			if(client.room){
				client.broadcast.to(client.room).emit('new_message',data);
			}
		});

		client.on('open_invitation',function(data){
			client.broadcast.emit('open_invitation',{
				room_name : client.room
			})
		});

		client.on('close_invitation',function(){
			client.broadcast.emit('close_invitation',{
				room_name : client.room
			})
		});
		

		client.on('disconnect',function(){
			console.log("client disconnected");
		});
	});
};