// http://www.cocos2d-iphone.org/forums/topic/subclass-ccsprite-vs-model-class-best-practice/
// http://www.cocos2d-x.org/html5-samples/samples/games/MoonWarriors/index.html //
// 
var MAX_STEER_ANGLE = Math.PI / 3;
var STEER_SPEED = 1.5;
var HORSEPOWERS = 40;

var TankSprite = cc.Sprite.extend({
  maxSteerAngle: 0,
  steerSpeed: 0,
  sidewaysFrictionForce: 10,
  horsePower: 40,
  carStartingPos: null,
  currentRotation: 0,
  engineSpeed: 0,
  steeringAngle: 0,
  b: {},
  ctor: function() {
    this._super();
    this.initWithFile("resources/images/tank.png");
    //this._initBox2DBody(box2dManager.world);
    
  },
  _initBox2DBody: function() {
    /*
    this.maxSteerAngle = Math.PI / 3;
    this.steerSpeed = 1.5;
    this.sidewaysFrictionForce = 10;
    this.horsePower = 40;
    this.carStartingPos = new b2Vec2(10, 10);

    var leftRearWheelPosition = new b2Vec2(-1.5, 1.90);
    var rightRearWheelPosition = new b2Vec2(1.5, 1.9);
    var leftFrontWheelPosition = new b2Vec2(-1.5, -1.9);
    var rightFrontWheelPosition = new b2Vec2(1.5, -1.9);

    var world = box2dManager.world;
    var fixDef = new b2FixtureDef();

    // define our body
    var bodyDef = new b2BodyDef();
    bodyDef.userData = this;
    bodyDef.linearDamping = 1;
    bodyDef.angularDamping = 1;
    bodyDef.position = this.carStartingPos.Copy();
    fixDef.density = 1;
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(1.5, 2.5);
    bodyDef.type = b2Body.b2_dynamicBody;
    this.b.body = world.CreateBody(bodyDef);
    this.b.body.CreateFixture(fixDef);

    var leftWheelDef = new b2BodyDef();
    leftWheelDef.position = this.carStartingPos.Copy();
    leftWheelDef.position.Add(leftFrontWheelPosition);
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(0.2, 0.5);
    fixDef.density = 1;
    leftWheelDef.type = b2Body.b2_dynamicBody;
    this.b.leftWheel = world.CreateBody(leftWheelDef);
    this.b.leftWheel.CreateFixture(fixDef);

    var rightWheelDef = new b2BodyDef();
    rightWheelDef.position = this.carStartingPos.Copy();
    rightWheelDef.position.Add(rightFrontWheelPosition);
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(0.2, 0.5);
    fixDef.density = 1;
    rightWheelDef.type = b2Body.b2_dynamicBody;
    this.b.rightWheel = world.CreateBody(rightWheelDef);
    this.b.rightWheel.CreateFixture(fixDef);

    var leftRearWheelDef = new b2BodyDef();
    leftRearWheelDef.position = this.carStartingPos.Copy();
    leftRearWheelDef.position.Add(leftRearWheelPosition);
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(0.2, 0.5);
    fixDef.density = 1;
    leftRearWheelDef.type = b2Body.b2_dynamicBody;
    this.b.leftRearWheel = world.CreateBody(leftRearWheelDef);
    this.b.leftRearWheel.CreateFixture(fixDef);

    var rightRearWheelDef = new b2BodyDef();
    rightRearWheelDef.position = this.carStartingPos.Copy();
    rightRearWheelDef.position.Add(rightRearWheelPosition);
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(0.2, 0.5);
    fixDef.density = 1;
    rightRearWheelDef.type = b2Body.b2_dynamicBody;
    this.b.rightRearWheel = world.CreateBody(rightRearWheelDef);
    this.b.rightRearWheel.CreateFixture(fixDef);

    var leftJointDef = new b2RevoluteJointDef();
    leftJointDef.Initialize(this.b.body, this.b.leftWheel, this.b.leftWheel.GetWorldCenter());
    leftJointDef.enableMotor = true;
    leftJointDef.maxMotorTorque = 100;
    this.b.leftJoint = world.CreateJoint(leftJointDef);

    var rightJointDef = new b2RevoluteJointDef();
    rightJointDef.Initialize(this.b.body, this.b.rightWheel, this.b.rightWheel.GetWorldCenter());
    rightJointDef.enableMotor = true;
    rightJointDef.maxMotorTorque = 100;
    this.b.rightJoint = world.CreateJoint(rightJointDef);

    var leftRearJointDef = new b2PrismaticJointDef();
    leftRearJointDef.Initialize(this.b.body, this.b.leftRearWheel, this.b.leftRearWheel.GetWorldCenter(), new b2Vec2(1, 0));
    leftRearJointDef.enableLimit = true;
    leftRearJointDef.lowerTranslation = leftRearJointDef.upperTranslation = 0;
    this.b.leftRearJoint = world.CreateJoint(leftRearJointDef);

    var rightRearJointDef = new b2PrismaticJointDef();
    rightRearJointDef.Initialize(this.b.body, this.b.rightRearWheel, this.b.rightRearWheel.GetWorldCenter(), new b2Vec2(1, 0));
    rightRearJointDef.enableLimit = true;
    rightRearJointDef.lowerTranslation = rightRearJointDef.upperTranslation = 0;
    this.b.rightRearJoint = world.CreateJoint(rightRearJointDef);
    */
  },
  update: function() {

    this.setRotation(this.currentRotation);

    //This function applies a "friction" in a direction orthogonal to the body's axis.
    /*
    function killOrthogonalVelocity(targetBody) {
      var localPoint = new b2Vec2(0, 0);
      var velocity = targetBody.GetLinearVelocityFromLocalPoint(localPoint);
      var sidewaysAxis = targetBody.GetTransform().R.col2.Copy();
      sidewaysAxis.Multiply(b2Math.b2Dot(velocity, sidewaysAxis));
      targetBody.SetLinearVelocity(sidewaysAxis);//targetBody.GetWorldPoint(localPoint));        
    }

    b2Math.b2Dot = function(a, b)
    {
      return a.x * b.x + a.y * b.y;
    };

    //Driving
    var ldirection = this.b.leftWheel.GetTransform().R.col2.Copy();
    ldirection.Multiply(this.engineSpeed);
    var rdirection = this.b.rightWheel.GetTransform().R.col2.Copy();
    rdirection.Multiply(this.engineSpeed);
    this.b.leftWheel.ApplyForce(ldirection, this.b.leftWheel.GetPosition());
    this.b.rightWheel.ApplyForce(rdirection, this.b.rightWheel.GetPosition());

    //Steering
    var mspeed;
    mspeed = this.steeringAngle - this.b.leftJoint.GetJointAngle();
    this.b.leftJoint.SetMotorSpeed(mspeed * this.steerSpeed);
    mspeed = this.steeringAngle - this.b.rightJoint.GetJointAngle();
    this.b.rightJoint.SetMotorSpeed(mspeed * this.steerSpeed);


    killOrthogonalVelocity(this.b.leftWheel);
    killOrthogonalVelocity(this.b.rightWheel);
    killOrthogonalVelocity(this.b.leftRearWheel);
    killOrthogonalVelocity(this.b.rightRearWheel);


    //This function applies a "friction" in a direction orthogonal to the body's axis.
    function killOrthogonalVelocity(targetBody) {
      var localPoint = new b2Vec2(0, 0);
      var velocity = targetBody.GetLinearVelocityFromLocalPoint(localPoint);
      var sidewaysAxis = targetBody.GetTransform().R.col2.Copy();
      sidewaysAxis.Multiply(b2Math.b2Dot(velocity, sidewaysAxis));
      targetBody.SetLinearVelocity(sidewaysAxis);
    }
  */
  },
  handleKey: function(e) {

    var newX, newY;

    if (e === cc.KEY.left) {
       this.currentRotation-=10;
      //this.steeringAngle = -MAX_STEER_ANGLE;
    } else if (e === cc.KEY.right) {
       this.currentRotation+=10;
      //this.steeringAngle = MAX_STEER_ANGLE;
    } else if (e === cc.KEY.up) {
      newX = this.getPositionX() + Math.cos(this.currentRotation * Math.PI/180) * 10;
      newY = this.getPositionY() - Math.sin(this.currentRotation * Math.PI/180) * 10;
           
      this.setPositionX(newX);
      this.setPositionY(newY);
      //this.engineSpeed = HORSEPOWERS;
    } else if (e === cc.KEY.down) {
      //this.engineSpeed = -HORSEPOWERS;
      
      newX = this.getPositionX() - Math.cos(this.currentRotation * Math.PI/180) * 10;
      newY = this.getPositionY() + Math.sin(this.currentRotation * Math.PI/180) * 10;
           
      this.setPositionX(newX);
      this.setPositionY(newY);
    }
    if(this.currentRotation < 0) this.currentRotation = 360;
    if(this.currentRotation > 360) this.currentRotation = 0;
  },
  onKeyUp: function(e) {
    /*
    if (e === cc.KEY.left || e === cc.KEY.right) {
      this.steeringAngle = 0;
    } else if (e === cc.KEY.up || e === cc.KEY.down) {
      this.engineSpeed = 0;
    }
    */
  }

});


