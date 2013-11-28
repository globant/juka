var WaitingPlayerScene = cc.Scene.extend({
        onEnter:function(){
            this._super();
            var layer = new WaitingPlayerLayer();
            layer.init();
            this.addChild(layer);
        }
    }
);

var WaitingPlayerLayer = cc.Layer.extend({
    init:function () {
        this._super();
        
        var s = cc.Director.getInstance().getWinSize();
        var layer1 = cc.LayerColor.create(new cc.Color4B(0,0,255, 255),s.width,s.height);
        layer1.setAnchorPoint(new cc.Point(0.5, 0.5));
        
        var label = cc.LabelTTF.create("Waiting for opponent...", "Arial", 30);
        label.setPosition(new cc.Point(s.width/2, s.height/2));
        label.setColor(new cc.Color3B(255,0,0));
        
        layer1.addChild(label);
        this.addChild(layer1);

        return true;
    },
    onEnterTransitionDidFinish:function(){

        console.log("current state " + socketClient.currentState);
        
        if (socketClient.currentState === "readyToPlay" || !socketClient.isPlayerOne){
            console.log("TRANSICION A ESCENA DE JUEGO 1");

            setTimeout(function(){
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(3,new GameScene()));
            },2000);

        }else if (socketClient.currentState === "connected" || socketClient.isPlayerOne){
            socketClient.addEventListener("playerTwoConnected", socketClient_readyToPlay);
        }else{
            console.log("Add connect listener");
            socketClient.addEventListener("connect", socketClient_connected);
        }

        function socketClient_readyToPlay(socket, event){
            console.log("TRANSICION A ESCENA DE JUEGO 2");
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(3,new GameScene()));
        }
        
        function socketClient_connected(){

            if (socketClient.currentState === "readyToPlay" || !socketClient.isPlayerOne){
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(3,new GameScene()));
            }else if (socketClient.currentState === "fullGame") {
                label.setString("Room is full");

                setTimeout(function(){
                     cc.Director.getInstance().replaceScene(cc.TransitionFade.create(3,new MenuScene()));
                },
                5000);
            }else {
                socketClient.addEventListener("playerTwoConnected", socketClient_readyToPlay);
                socketClient.addEventListener("imPlayerTwo", socketClient_readyToPlay);
            }


        }

    }
});


