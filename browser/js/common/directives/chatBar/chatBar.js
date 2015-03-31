'use strict';
app.directive('chatBar', function(ChatroomFactory,SocketReaction){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/chatBar/chatBar.html',
		link: function(scope,element,attribute){
			scope.current_message = "";
			scope.message_to_display = [];
			scope.invitations = [];

			//button functions
			scope.submit_message = function(){
				ChatroomFactory.send_message_to_server(scope.current_message)
				scope.message_to_display.push(scope.current_message);
			};
			scope.open_invitation = ChatroomFactory.open_invitation;
			scope.close_invitation = ChatroomFactory.close_invitation;
			scope.create_room = function(){
				ChatroomFactory.create_room(scope.roomName);
			};
			scope.join_room = function(){
				ChatroomFactory.join_room(scope.roomName);
			};

			//all socket.on reactions
			SocketReaction.socket_on(socket,scope);
		}
	};
});