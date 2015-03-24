'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {
	var namespaces = [];

    if (io) return io;

    io = socketio(server);

	io.on('connection',function(client){
		function nsp_communication(client){
			var current_nsp = io.of(client.nsp);
			
			io.of(current_nsp).on('new_message',function(data){
				io.of(current_nsp).
			});
		}
		console.log("client connected");

		client.on('location',function(data){
			client.geo_location = data;
		});

		client.on('message',function(data){
			console.log(data);
			client.broadcast.emit('new_message',data);
		});

		client.on('create_room',function(data){
			console.log(data);
			var nsp = io.of('/'+data.room_name)
			namespaces.push(nsp);
			console.log(namespaces);
			nsp.on('connection', function(socket){
			  console.log('someone connected')

			});
			nsp.emit('hi', 'everyone!');
		});

		client.on('join_room',function(data){
			client.join(data.name);
		})

		client.on('open_invitation',function(data){
			client.emit('open_invitation',{
			})
		});
		

		client.on('disconnect',function(){
			console.log("client disconnected");
		});
	});
};