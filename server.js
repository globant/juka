var
	gameport 		= process.env.PORT || 4005,

	io				= require('socket.io'),
	express			= require('express'),

	verbose			= false,
	http			= require('http'),
	app				= express(),
	server			= http.createServer(app);

server.listen(gameport)

app.get( '/', function( req, res ){
	console.log('trying to load %s', __dirname + '/index.html');
	res.sendfile( '/front_end/index.html' , { root:__dirname });
});

app.get( '/*' , function( req, res, next ) {

		//This is the current file they have requested
	var file = req.params[0];

		//For debugging, we can track what files are requested.
	if(verbose) console.log('\t :: Express :: file requested : ' + file);

		//Send the requesting client the file.
	res.sendfile( __dirname + '/front_end/' + file );

}); //app.get *

var sio = io.listen(server);

sio.configure(function (){
	sio.set('log level', 0);
	sio.set('authorization', function (handshakeData, callback) {
		callback(null, true); // error first callback style
	});
});


/**
 * client.emit: Enviar un mensaje al cliente.
 * client.broadcast.emit: Cliente envia mensajes a todos menos a el mismo. 
 * sio.sockets.emit: a todos.
 * */

var playerOne = playerTwo = null;

/**
 * Cuando un cliente pega en el servidor por primera vez*/
sio.sockets.on('connection', function (client) {

	if(playerOne && playerTwo){
		client.emit("fullGame");
		return false;
	}
	
	if(!playerOne){
		playerOne = client;
		client.emit("imPlayerOne")
	}else{
		playerTwo = client;
		playerTwo.emit("imPlayerTwo", playerOne.id);
		playerOne.emit("playerTwoConnected", playerTwo.id);
	}
	
	/** Se asocia a este cliente con un evento capturar sus mensajes */
	client.on("sendMessage", function(messageID, messageData){
		console.log("recieveMessage", this.id, messageID, messageData);
		sio.sockets.emit("recieveMessage", this.id, messageID, messageData);
		//handleMessage(this.id, messageID, messageData);
	});
	
	/** Cuando un jugador se desconecta se maneja la desconeccion y se 
	 * le avisa a los demas de la desconeccion para que la manejen */
	client.on('disconnect', function(){
		console.log("disconnect", client.id);
		sio.sockets.emit('playerDisconnected', client.id);
		if (client.id === playerOne.id){
			playerOne = null;
		}else{
			playerTwo = null;
		}
	});
	
}); /** End on connection */
