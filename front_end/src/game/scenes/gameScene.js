var GameScene = cc.Scene.extend({
    
        onEnter:function(){
            this._super();
            var layer = new GameLayer();
            layer.init();
            this.addChild(layer);
        }
    
    }
);

var GameLayer = cc.Layer.extend({
    playerOneSprite:null,
    playerTwoSprite:null,
    currentPlayerSprite:null,
    init:function () {
        this._super();
        this.setKeyboardEnabled(true);
        
        var tileMap = new TileMeadow();
        var objectGroup = tileMap.getObjectGroup("Objects");
        var spawnPoint = objectGroup.objectNamed("player");
      
        this.playerOneSprite = new TankSprite();
        this.playerOneSprite.setPosition(spawnPoint.x, spawnPoint.y);
        tileMap.addChild(this.playerOneSprite);

        this.playerTwoSprite = new TankSprite();
        this.playerTwoSprite.setPosition(spawnPoint.x + 100, spawnPoint.y);
        tileMap.addChild(this.playerTwoSprite);

        this.addChild(tileMap);

        this.scheduleUpdate();
        this.schedule(this.update);
        
        this.setViewPointCenter( this.playerOneSprite.getPosition());
        
        if (socketClient.isPlayerOne){
            this.currentPlayerSprite = this.playerOneSprite;
        }else{
            this.currentPlayerSprite = this.playerTwoSprite;
        }

        return true;
    },
    setViewPointCenter:function(position){
        var winSize = cc.Director.getInstance().getWinSize();
        var x = Math.max(position.x, winSize.width/2);
        var y = Math.max(position.y, winSize.height/2);
        var actualPosition = cc.p(x, y);
        var centerOfView = cc.p(winSize.width/2, winSize.height/2);
        var viewPoint = cppSub(centerOfView, actualPosition);
        this.setPosition(viewPoint);
    },
    update:function(dt){
        //box2dManager.update();        
        if (typeof this.currentPlayerSprite != "undefined"){
             this.setViewPointCenter( this.currentPlayerSprite.getPosition());
        }
        this.currentPlayerSprite.update();
    },
    onKeyDown:function(e){
        this.currentPlayerSprite.handleKey(e);
    },
    onKeyUp:function(e){
      this.currentPlayerSprite.onKeyUp(e);
    }
            
});

function cppSub(pointA, pointB){
    return cc.p(pointA.x -pointB.x,pointA.y- pointB.y);
}

var TileMeadow = cc.TMXTiledMap.extend({
    ctor: function(){
        this._super();
        this.init();
        this.initWithTMXFile("resources/images/TileMap.tmx");
    }
    
});

