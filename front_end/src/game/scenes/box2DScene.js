// http://aniruddhaloya.blogspot.com.ar/2012/11/box2d-javascript-part-2.html
var Box2DScene = cc.Scene.extend({
        onEnter:function(){
            this._super();
            var layer = new Box2DLayer();
            layer.init();
            this.addChild(layer);
        }
    }
    
);
   
var PTM_RATIO = 32;

var Box2DLayer = cc.Layer.extend({
    world:null,
    ctor:function(){
        this._super();
        var b2Vec2 = Box2D.Common.Math.b2Vec2,
            b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2World = Box2D.Dynamics.b2World,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

        var screenSize = cc.Director.getInstance().getWinSize();

        this.world = new b2World(new b2Vec2(0,-10), true);
        this.setupDebugDraw();
        this.world.SetContinuousPhysics(true);

        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        var bodyDef = new b2BodyDef();
        b2BodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(20,2);

        bodyDef.position.Set(0, screenSize.height / PTM_RATIO + 1.8);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);

        bodyDef.type = b2Body.b2_dynamicBody;

        for(var i = 0; i < 10; ++i) {
            if(Math.random() > 0.5) {
                fixDef.shape = new b2PolygonShape;
                fixDef.shape.SetAsBox(
                      Math.random() + 0.1 //half width
                   ,  Math.random() + 0.1 //half height
                );
                } else {
                    fixDef.shape = new b2CircleShape(
                        Math.random() + 0.1 //radius
                    );
            }
            bodyDef.position.x = Math.random() * 0;
            bodyDef.position.y = Math.random() * 0;
            this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        } 
    },
        setupDebugDraw:function(){
          var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
          var debugDraw = new b2DebugDraw();
          debugDraw.SetSprite(document.getElementById("gameCanvas").getContext("2d"));
          debugDraw.SetDrawScale(32.0);
          debugDraw.SetFillAlpha(0.3);
          debugDraw.SetLineThickness(1.0);
          debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit | b2DebugDraw.e_centerOfMassBit);
          this.world.SetDebugDraw(debugDraw);     
        },
	onEnter:function(){
            this._super();
            this.scheduleUpdate();
	},
	update:function(dt){
            var velocityIterations = 8;
            var positionIterations = 1;
            this.world.Step(dt, velocityIterations, positionIterations);
            this.world.DrawDebugData();
            this.world.ClearForces();
            /*
            for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
                //if (b.GetUserData() != null) {
                    console.log(b.GetPosition().x);
                    console.log(b.GetPosition().y);
                    console.log(b.GetAngle());
                //}
            }
            */
	}
});
