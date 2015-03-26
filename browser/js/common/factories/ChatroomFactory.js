'use strict';
app.factory('ChatroomFactory', function ($http){
	var current_nsp;
	return {
		send_message_to_server : function(message_text){
			socket.emit('message',{
				// name : user.firstName,
				message : message_text
			});
		},
		save_message_to_database : function(username,message){
			$http.post('/api/chatroom/');
		},
		create_room : function(room_name){
			socket.emit('join_room',room_name);
			$http.post('/api/chatroom/create',{
				chatroom:{
					name : room_name
				}
			}).then(function(response){
				alert(response.data);
			});
		},
		join_room : function(room_name){
			socket.emit('join_room',room_name)
		},
		open_invitation : function(location,range){
			socket.emit('open_invitation',{
				location: location,
				range: range
			})
		},
		close_invitation: function(){
			socket.emit('close_invitation');
		},
		leave_room : function(){
			socket.emit('leave_room');
		},
		up_vote: function(event){
			socket.emit('up_vote',{
				event : event
			});
		},
		down_vote : function(event){
			socket.emit('down_vote',{
				event : event
			});
		}
	}
});
