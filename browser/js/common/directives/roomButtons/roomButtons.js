'use strict';
app.directive('roomButtons',function(){
	return {
		restrict : "E",
		templateUrl : "js/common/directives/roomButtons/roomButtons.html",
		link : function(scope,element,attribute){
			console.log("hi")
			scope.createRoom = function(){
				//create a name space and join based on modal
				alert("clicked");
				console.log("hi")
				console.log(scope.chatRoomName)
			}
		}
		
	};
});