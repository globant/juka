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
    _playerSprite:null,
    init:function () {
        this._super();
        this.setKeyboardEnabled(true);
        
        var tileMap = new TileMeadow();
        var objectGroup = tileMap.getObjectGroup("Objects");
        var spawnPoint = objectGroup.objectNamed("player");
      
        this._playerSprite = new TankSprite();
        this._playerSprite.setPosition(spawnPoint.x, spawnPoint.y);
        this._playerSprite.scheduleUpdate();
        this._playerSprite.schedule(this.update);
        
        tileMap.addChild( this._playerSprite);
        
        this.addChild(tileMap);
        this.setViewPointCenter( this._playerSprite.getPosition());
        
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
        box2dManager.update();        
        if (this._playerSprite){
             this.setViewPointCenter( this._playerSprite.getPosition());
        }
            
    },
    onKeyDown:function(e){
        this._playerSprite.handleKey(e);
       
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

