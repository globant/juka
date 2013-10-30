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
      
        /*
        var sprite = cc.Sprite.create("resources/images/Player.png");
        sprite.setPosition(spawnPoint.x, spawnPoint.y);
        sprite.setScale(0.5);
        sprite.setRotation(180);
        */
        
        this._playerSprite = new Tank();
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
          var actualPosition = cc.PointMake(x, y);
          var centerOfView = cc.PointMake(winSize.width/2, winSize.height/2);
          var viewPoint = cppSub(centerOfView, actualPosition);
          this.setPosition(viewPoint);
    },
    update:function(dt){
        
        
    },
    onKeyDown:function(e){
        this._playerSprite.handleKey(e);
        this.setViewPointCenter( this._playerSprite.getPosition());
    }
            
});

function cppSub(pointA, pointB){
    return cc.PointMake(pointA.x -pointB.x,pointA.y- pointB.y);
}


var TileMeadow = cc.TMXTiledMap.extend({
    ctor: function(){
        this._super();
        this.initWithTMXFile("resources/images/TileMap.tmx");
    }
    
});

