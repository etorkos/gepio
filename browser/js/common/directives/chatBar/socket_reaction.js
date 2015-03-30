app.service('SocketReaction',function(){
	return {
		socket_on : function(socket,scope){
			socket.on('new_message',function(data){
				scope.message_to_display.push(data);
				scope.$digest();
			});

			socket.on('open_invitation',function(data){
				if(scope.invitations.indexOf(data.room_name) < 0) scope.invitations.push(data.room_name) ;
				scope.$digest();

				console.log("hi",data);
			});
			socket.on('close_invitation',function(data){
				scope.invitations.splice(scope.invitations.indexOf(data.room_name),1)
				scope.$digest();
			});
			socket.on('upvote',function(data){
				console.log(data);
			});
			socket.on('downvote',function(data){
				console.log(data);
			});
		}
	};
});