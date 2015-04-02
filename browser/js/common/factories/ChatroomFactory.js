'use strict';
app.factory('ChatroomFactory', function ($http, DataSetFactory){
	return {
		current_itinerary_id : null,
		set_itinerary_id : function(id){
			// console.log(id, "set id")
			this.current_itinerary_id = id;
		},
		get_itinerary_id : function(){
			return this.current_itinerary_id;
		},
		set_chatroom_name : function(chatroom_name){
			//a method to change name of chatroom
		},
		send_message : function(message_text){
			//encapsulation of two methods
			this.send_message_to_server(message_text);
			this.save_message_to_database(message_text);
		},
		send_message_to_server : function(name,message_text){
			socket.emit('message',{
				name : name,
				message : message_text
			});
		},
		save_message_to_database : function(message){
			//will get itinerary id from req.user at server
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
			if(typeof room_name == "undefined"){
				// console.log(this.current_itinerary_id, "join room from this")
				socket.emit('join_room',this.current_itinerary_id);
			}
			socket.emit('join_room',room_name)
		},
		open_invitation : function(username,lat,lng,range){
			socket.emit('open_invitation',{
				username : username,
				room_name : this.current_itinerary_id,
				lat : lat,
				lng : lng,
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
			var obj = {};
			obj.type = event.type;
			obj.name = event.name;
			obj.vote = 1;
			if(event.type == "venues"){
				obj.lat = event.location.lat,
				obj.lng = event.location.lng
			}
			else if (event.type == "event"){
				obj.lat = event.venue.latitude,
				obj.lng = event.venue.longitude
			}
			socket.emit('up_vote', obj);
		},
		down_vote : function(event){
			var obj = {};
			obj.type = event.type;
			obj.name = event.name;
			obj.vote = -1;
			if(event.type == "venues"){
				obj.lat = event.location.lat,
				obj.lng = event.location.lng
			}
			else if (event.type == "event"){
				obj.lat = event.venue.latitude,
				obj.lng = event.venue.longitude
			}
			socket.emit('down_vote', obj);
		},
		top_eights : function(eights){
			socket.emit('top_eights',eights);
		},
		invite_friend : function(friend_id){
			socket.emit('invite_friend',friend_id);
		},
		bind_user_id : function(user_id){
			socket.emit('bind_user_id',user_id);
		},
		update_vote : function(data){
			var type = data.type;
			var vote = data.vote;
			if(type == 'event'){
				DataSetFactory.events.forEach(function(a){
					if(a.name == data.name){
						a.vote += vote
					}
				})
			}
			else if(type == 'venue'){
				DataSetFactory.venues.forEach(function(a){
					if(a.name == data.name){
						a.vote += vote
					}
				})
			}
		}
	}
});
