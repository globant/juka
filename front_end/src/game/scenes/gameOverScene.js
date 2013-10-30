var GameOverScene = cc.Scene.extend({
        onEnter:function(){
            this._super();
            var layer = new GameOverLayer();
            layer.init();
            this.addChild(layer);
        }
    
    }
);

var GameOverLayer = cc.Layer.extend({
   
    init:function () {
        this._super();
        
        var s = cc.Director.getInstance().getWinSize();
        var layer1 = cc.LayerColor.create(new cc.Color4B(0,255,0, 255),s.width,s.height);
        layer1.setAnchorPoint(new cc.Point(0.5, 0.5));
        
        var label = cc.LabelTTF.create("Game Over", "Arial", 30);
        label.setPosition(new cc.Point(s.width/2, s.height/2));
        label.setColor(new cc.Color3B(255,0,0));
        
        layer1.addChild(label);
        this.addChild(layer1);
     
        return true;
    }
});


