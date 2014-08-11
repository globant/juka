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
  },
  update: function() {


  },
  handleKey: function(e) {
    // if (e === cc.KEY.left) {
    //   this.steeringAngle = -MAX_STEER_ANGLE;
    // } else if (e === cc.KEY.right) {
    //   this.steeringAngle = MAX_STEER_ANGLE;
    // } else if (e === cc.KEY.up) {
    //   this.engineSpeed = HORSEPOWERS;
    // } else if (e === cc.KEY.down) {
    //   this.engineSpeed = -HORSEPOWERS;
    // }
  },
  onKeyUp: function(e) {
    // if (e === cc.KEY.left || e === cc.KEY.right) {
    //   this.steeringAngle = 0;
    // } else if (e === cc.KEY.up || e === cc.KEY.down) {
    //   this.engineSpeed = 0;
    // }
  }

});


