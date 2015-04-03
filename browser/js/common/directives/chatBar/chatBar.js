'use strict';
app.directive('chatBar', function(ChatroomFactory,SocketReaction){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/chatBar/chatBar.html',
		link: function(scope,element,attribute){
			scope.message_to_display = [];
			ChatroomFactory.sync_messages_from_db(scope.message_to_display);
			scope.current_message = "";
			// scope.invitations = [];
			//button functions
			scope.submit_message = function(message){
				//change to scope.user.firstName later
				ChatroomFactory.send_message_to_server(scope.user.firstName, message);
				scope.current_message = "";
				scope.message_to_display.push({name:"me",message:message});
			};
			// scope.open_invitation = ChatroomFactory.open_invitation;
			// scope.close_invitation = ChatroomFactory.close_invitation;
			// scope.create_room = function(){
			// 	ChatroomFactory.create_room(scope.roomName);
			// };
			scope.join_room = function(roomName){
				ChatroomFactory.join_room(roomName);
			};

			//all socket.on reactions
			SocketReaction.socket_on(socket,scope);
		}
	};
});