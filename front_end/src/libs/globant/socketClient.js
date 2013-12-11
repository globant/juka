var socketClient = {
	playerOneId:null,
	playerTwoId:null,
	players:{},
	socket:null,
	eventHandlers:{},
	currentState:"",
	isPlayerOne:true,
	addEventListener:function(eventName, eventHandler){
		if (typeof this.eventHandlers[eventName] === "undefined" ){
			this.eventHandlers[eventName] = [];
		}
		this.eventHandlers[eventName].push(eventHandler);
	},
	dispatchEvent:function(eventName, eventData){
		console.log(eventName);

		if (typeof this.eventHandlers !== "undefined"){
			var index;
			var eventHandlers = this.eventHandlers[eventName];
			if (typeof eventHandlers !== "undefined"){
				for (index = 0; index < eventHandlers.length; ++index) {
					eventHandler = eventHandlers[index];
					eventHandler(this, eventData);
				}
			}
		}
		
	},
	removeEventListener:function(eventName, eventHandler){


	},
	init:function(){

		this.socket = io.connect();
		
		this.socket.on('connect', function(){
			this.currentState = "connected";
			this.dispatchEvent('connect');
		}.bind(this));

		this.socket.on("fullGame", function(){
			this.currentState = "fullGame";
			this.dispatchEvent('fullGame');
		}.bind(this));

		this.socket.on('imPlayerOne', function(data){
			this.currentState = "waitingPlayerTwo";
			this.dispatchEvent('imPlayerOne');
			this.playerOneId=this.socket.socket.sessionid;
		}.bind(this));

		this.socket.on('imPlayerTwo', function(playerOneId){
			this.isPlayerOne = false;
			this.currentState = "readyToPlay";
			this.dispatchEvent('imPlayerTwo');
			this.playerTwoId=this.socket.socket.sessionid;
			this.playerOneId=playerOneId;
		}.bind(this));

		this.socket.on('playerTwoConnected', function(playerTwoId){
			this.currentState = "readyToPlay";
			this.dispatchEvent('playerTwoConnected');
			this.playerTwoId=playerTwoId;
		}.bind(this));

		this.socket.on('recieveMessage', function(clientId, messageID, messageData){
			this.players[clientId].handleSocketMessage(messageID, messageData);
			this.dispatchEvent('recieveMessage', {clientId:clientId, messageID:messageID, messageData:messageData});
		}.bind(this));

		this.socket.on('playerDisconnected', function(playerId){
			this.dispatchEvent('playerDisconnected', playerId);
			delete this.players[playerId];
		}.bind(this));
		
	},
	setPlayerOneSprite:function(sprite){
		this.players[this.playerOneId] = sprite;
	},
	setPlayerTwoSprite:function(sprite){
		this.players[this.playerTwoId] = sprite;
	},
	sendMessage:function(messageID,messageData){
		this.socket.emit('sendMessage', messageID, messageData);
	}
};




	

