'use strict';
app.directive('roomButtons',function(){
	return {
		restrict : "E",
		templateUrl : "js/common/directives/roomButtons/roomButtons.html",
		link : function(scope,element,attribute){
			scope.createRoom = function(){
				//create a name space and join based on modal
				socket.emit('createRoom',{
					name : scope.chatRoomName 
				})

			},
			scope.joinRoom = function(){
				var roomSocket = io(scope.chatRoomName);
				
			}
		}
		
	};
});