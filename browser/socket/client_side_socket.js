//var socket = io.connect('http://localhost:1337');
var socket = io.connect('http://gepio.herokuapp.com')
socket.on('messages',function(data){
	console.log(data);
});
