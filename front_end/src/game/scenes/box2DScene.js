
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
			b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

		var screenSize = cc.Director.getInstance().getWinSize();
		
		
		this.world = new b2World(new b2Vec2(0,-10), true);
		this.world.SetContinuousPhysics(true);


		
		var fixDef = new b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.2;

		var bodyDef = new b2BodyDef();
		b2BodyDef.type = b2Body.b2_staticBody;
		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox(20,2);

		bodyDef.position.Set(10, screenSize.height / PTM_RATIO + 1.8);

		this.world.CreateBody(bodyDef).CreateFixture(fixDef);

	},
	onEnter:function(){
		this._super();
		this.scheduleUpdate();
	},
	update:function(dt){
	 	var velocityIterations = 8;
        var positionIterations = 1;
        this.world.Step(dt, velocityIterations, positionIterations);
	}

});
