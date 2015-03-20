var socket = io.connect('http://localhost:1337');
socket.on('messages',function(data){
	console.log(data);
});