'use strict';
app.factory('ChatroomFactory', function ($http){
	var current_itinerary_id;
	return {
		set_itinerary_id : function(id){
			current_itinerary_id = id;
		},
		get_itinerary_id : function(){
			return current_itinerary_id;
		},
		send_message_to_server : function(message_text){
			socket.emit('message',{
				// name : user.firstName,
				message : message_text
			});
		},
		save_message_to_database : function(username,message){
			$http.post('/api/chatroom/',message);
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
		open_invitation : function(id,location,range){
			socket.emit('open_invitation',{
				room_id : id,
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
