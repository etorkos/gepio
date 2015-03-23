'use strict';
app.factory('ChatroomFactory', function (){
	var current_room;
	return {
		send_message_to_server : function(message_text){
			alert(message_text)
			socket.emit('message',{
				message : message_text
			});
		},
		create_room : function(room_name){
			socket.emit('create_room',{
				name : room_name
			});
			current_room = room_name;
		},
		open_invitation : function(){

		},
		leave_room : function(){

		},
		up_vote: function(){

		},
		down_vote : function(){

		}
	}
});