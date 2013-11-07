var WellcomeScene = cc.Scene.extend({
 
    // Executed when CCNode enters in the scene.
    onEnter:function(){
        this._super();
        var layer = new WellcomeLayer();
        layer.init();
        this.addChild(layer);

    }
    
});

var WellcomeLayer = cc.Layer.extend({
    
    init:function(){
        
        var playItem = cc.MenuItemLabel.create(cc.LabelTTF.create("Game", "Arial", 30), function(){
            cc.Director.getInstance().replaceScene(cc.TransitionJumpZoom.create(3,new GameScene()));
        });
        var helpItem = cc.MenuItemLabel.create(cc.LabelTTF.create("Instructions","Arial", 30), function(){
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(3, new InstructionsScene(), cc.c3b(255,0,0)));
        });
        var creditsItem = cc.MenuItemLabel.create(cc.LabelTTF.create("Credits","Arial", 30), function(){
            cc.Director.getInstance().replaceScene(cc.TransitionRotoZoom.create(3,new CreditsScene()));
        });
        var box2DItem = cc.MenuItemLabel.create(cc.LabelTTF.create("Box 2D","Arial", 30), function(){
            cc.Director.getInstance().replaceScene(cc.TransitionRotoZoom.create(3,new Box2DScene()));
        });

        var menu = cc.Menu.create(playItem, helpItem, creditsItem, box2DItem);
        menu.alignItemsVertically();
   
        this.addChild(menu);     
    },
    onEnter:function(){
        this._super();
        this.scheduleUpdate();
    },
    update:function(){
        this._super();
        console.log("HOLA");
    }
});  