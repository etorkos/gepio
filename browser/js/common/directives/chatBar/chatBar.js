'use strict';
app.directive('chatBar', function(ChatroomFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/chatBar/chatBar.html',
		link: function(scope,element,attribute){
			scope.current_message = "";
			scope.message_to_display = [];
			scope.submit_message = function(){
				ChatroomFactory.send_message_to_server(scope.current_message)
				scope.message_to_display.push(scope.current_message);
			};
			socket.on('new_message',function(data){
				console.log(data)
				scope.message_to_display.push(data);
				scope.$digest();
			});
			scope.create_room = function(){
				alert(scope.roomName);
				ChatroomFactory.create_room(scope.roomName);
			};
			scope.join_room = function(){
				alert(scope.roomName);
				ChatroomFactory.join_room(scope.roomName);
			};
		}
	};
});