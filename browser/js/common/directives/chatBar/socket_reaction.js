app.service('SocketReaction',function(ChatroomFactory, $rootScope){
	return {
		socket_on : function(socket,scope){
			socket.on('new_message',function(data){
				scope.message_to_display.push(data);
				scope.$digest();
			});

			socket.on('open_invitation',function(data){
				if(scope.invitations.indexOf(data.room_name) < 0) scope.invitations.push(data.room_name) ;
				scope.$digest();
			});
			socket.on('close_invitation',function(data){
				scope.invitations.splice(scope.invitations.indexOf(data.room_name),1)
				scope.$digest();
			});
		},
		socket_on_vote : function(socket,scope){
			socket.on('up_vote',function(data){
				// alert(data.name + "   "+data.vote);
				console.log(data)
				ChatroomFactory.update_vote(data);
				scope.$digest();
				$rootScope.$broadcast('SetVotes');
			});
			socket.on('down_vote',function(data){
				// alert(data.name + "   "+data.vote);
				ChatroomFactory.update_vote(data);
				scope.$digest();
				$rootScope.$broadcast('SetVotes');
			});
		}
	};
});
