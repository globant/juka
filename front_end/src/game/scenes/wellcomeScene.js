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
        var menu = cc.Menu.create(playItem, helpItem, creditsItem);
        menu.alignItemsVertically();
   
        this.addChild(menu);      
    }
        
});  