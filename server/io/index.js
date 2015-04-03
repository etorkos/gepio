'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {
	var all_clients = [];

    if (io) return io;

    io = socketio(server);

	io.on('connection',function(client){
		console.log("client connected");
		all_clients.push(client);

		client.on('invite_friend',function(friend_id){
			console.log('invitation', friend_id)
			all_clients.forEach(function(person){
				if(person.user_id == friend_id){
					// console.log(person.user_id, "look!")
					client.broadcast.to(person.id).emit('invitation',{
						room_id : client.room
					})
				}
			})
		})

		client.on('location',function(data){
			client.geo_location = data;
		});

		client.on('join_room',function(room_name){
			if(room_name !== null && room_name !== client.room){
				client.room = room_name;
				client.join(client.room);
				// console.log(client.room);
			}
		});

		client.on('message',function(data){
			if(client.room){
				// console.log(data);
				client.broadcast.to(client.room).emit('new_message',data);
			}
		});

		client.on('open_invitation',function(data){
			// console.log(data);
			client.room = data.room_id;
			client.join(client.room);
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
			var i = all_clients.indexOf(client);
			all_clients.splice(i,1);
		});

		client.on('up_vote', function(data){
			// console.log(data)
			client.broadcast.to(client.room).emit('up_vote',data)
		});

		client.on('down_vote', function(data){
			client.broadcast.to(client.room).emit('down_vote',data)
		});

		client.on('bind_user_id', function(user_id){
			if(user_id) client.user_id = user_id;
			// console.log(client.user_id)
		});
	});
};