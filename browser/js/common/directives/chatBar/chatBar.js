'use strict';
app.directive('chatBar', function(ChatroomFactory,SocketReaction){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/chatBar/chatBar.html',
		controller: function($scope){
			$scope.message_to_display = $scope.message_to_display ? $scope.message_to_display : [];
			// ChatroomFactory.sync_messages_from_db($scope.message_to_display);

			$scope.submit_message = function(){
				ChatroomFactory.send_message_to_server($scope.user.firstName, $scope.current_message);
				ChatroomFactory.save_message_to_database($scope.current_message);
				$scope.message_to_display.push({name:"me",message:$scope.current_message});
				$scope.current_message = '';
			};

			$scope.join_room = function(roomName){
				ChatroomFactory.join_room(roomName);
			};

			SocketReaction.socket_on(socket,$scope);
		}
	};
});