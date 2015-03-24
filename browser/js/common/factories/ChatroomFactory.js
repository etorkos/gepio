'use strict';
app.factory('ChatroomFactory', function (){
	var current_nsp;
	return {
		send_message_to_server : function(message_text){
			socket.emit('message',{
				// name : user.firstName,
				message : message_text
			});
		},
		create_room : function(room_name){
			socket.emit('create_room',{
				room_name : room_name
			});
			current_nsp = '/' + room_name;
			socket = io(current_nsp);
			console.log(socket)
		},
		join_room : function(room_name){
			socket.emit('join_room',room_name)
		},
		open_invitation : function(location,range,room_name){
			socket.emit('open_invitation',{
				location: location,
				range: range
			})
		},
		leave_room : function(){
			socket.emit('leave_room');
		},
		up_vote: function(){
			// socket.emit('')
		},
		down_vote : function(){

		}
	}
});
