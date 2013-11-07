

var CreditsScene = cc.Scene.extend(     
    /* @description Hola */
    /** @lends CreditsLayer.prototype */
    {
        /** @class CreditsScene */
        /** @namespace game/scenes*/
        /** Executed when entering the scene */
        onEnter:function(){
            this._super();
            var layer = new CreditsLayer();
            layer.init();
            this.addChild(layer);
        }
    }
);

var CreditsLayer = cc.Layer.extend(
    /** @lends CreditsLayer.prototype */
    {
    /** @class CreditsLayer */
    /** @namespace game/scenes */
    /** Initalices scene */
    init:function () {
        this._super();
        
        var s = cc.Director.getInstance().getWinSize();
        var layer1 = cc.LayerColor.create(new cc.Color4B(0,255,0, 255),s.width,s.height);
        layer1.setAnchorPoint(new cc.Point(0.5, 0.5));
        
        var label = cc.LabelTTF.create("Credits", "Arial", 30);
        label.setPosition(new cc.Point(s.width/2, s.height/2));
        label.setColor(new cc.Color3B(255,0,0));
        
        layer1.addChild(label);
        this.addChild(layer1);
     
        return true;
    }
});


