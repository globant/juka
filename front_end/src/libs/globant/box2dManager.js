 // bunch of variables required for various box2d objects

var b2Vec2,b2AABB,b2BodyDef,b2Body,b2FixtureDef,b2Fixture,b2World,b2PolygonShape, 
b2CircleShape,b2DebugDraw,b2RevoluteJointDef,b2RevoluteJoint,b2PrismaticJointDef,b2Math;

var context;



var box2dManager = {

        canvas:null,
        context:null,
        screenW:0,
        screenH:0,
        world:null,
        drawDebug:false,
        scale:20.0,
        /**
         * Inits Box2d variables and initializes world.
         * @param {String} canvasId the id of the canvas object.
         * @return {b2World} Initiated world.
         */
        initWorld:function(canvasId){

            //Init globalvariables.
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            b2AABB = Box2D.Collision.b2AABB;
            b2BodyDef = Box2D.Dynamics.b2BodyDef;
            b2Body = Box2D.Dynamics.b2Body;
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
            b2Fixture = Box2D.Dynamics.b2Fixture;
            b2World = Box2D.Dynamics.b2World;
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
            b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
            b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
            b2RevoluteJoint =  Box2D.Dynamics.Joints.b2RevoluteJoint;
            b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;
            b2Math = Box2D.Common.Math.b2Math;

            this.canvas = document.getElementById(canvasId);
            
            this.screenW = this.canvas.width, screenH = this.canvas.height;
            this.world = new b2World(new b2Vec2(0, 0) ,  true );
            this.scale = 20.0;

            // Debug options that aren't working...
            /*
            this.context = this.canvas.getContext("webgl"); 
            if (this.context == null){
                    this.context = this.canvas.getContext("2d"); 
            };
            if (this.context ==null){
                console.log("Couldn't get canvas context, debug draws won't be shown.");
            };

            
            var debugDraw = new b2DebugDraw();
            debugDraw.SetSprite(this.context);
            debugDraw.SetDrawScale(this.scale);
            debugDraw.SetFillAlpha(1);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit | b2DebugDraw.e_centerOfMassBit);
            this.world.SetDebugDraw(debugDraw);
            */
            return this.world;

        },
        init:function(){
                console.log("hola");
        },
        update:function(){
            this.world.Step(1 / 60, 3, 3); 
            //this.world.DrawDebugData();
            this.world.ClearForces();

            //Iterate over the bodies in the physics world
            for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
                if (b.GetUserData() != null) {
                    //Synchronize the AtlasSprites position and rotation with the corresponding body
                    var myActor = b.GetUserData();
                    myActor.setPosition(cc.p(b.GetPosition().x * this.scale, b.GetPosition().y * this.scale));
                    myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
                    //console.log(b.GetAngle());
                }
            }
        }
        
};










