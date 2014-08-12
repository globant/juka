// http://www.cocos2d-iphone.org/forums/topic/subclass-ccsprite-vs-model-class-best-practice/
// http://www.cocos2d-x.org/html5-samples/samples/games/MoonWarriors/index.html //
// 

var TankSprite = cc.Sprite.extend({
  maxSteerAngle: 0,
  steerSpeed: 0,
  sidewaysFrictionForce: 10,
  horsePower: 40,
  carStartingPos: null,
  currentRotation: 0,
  engineSpeed: 0,
  steeringAngle: 0,
  leftCaterpillarDirection: 0,
  rightCaterpillarDirection: 0,
  b: {},
  ctor: function() {
    this._super();
    this.initWithFile("resources/images/tank.png");
  },
  update: function() {
    var finalSpeed = this.engineSpeed / 10 * (this.leftCaterpillarDirection + this.rightCaterpillarDirection);
    var newX = Math.sin(this.getRotation() * Math.PI / 180) * finalSpeed  + this.getPositionX();
    var newY = Math.cos(this.getRotation() * Math.PI / 180) * finalSpeed + this.getPositionY();
    this.setPosition(newX, newY);

    this.setRotation(this.getRotation() + this.leftCaterpillarDirection - this.rightCaterpillarDirection);
  },
  handleKey: function(e) {
    if(e === 104){
      this.upPower();
    } else if(e === 98) {
      this.downPower();
    } else if(e === 103) {
      this.advanceLeftCaterpillar();
    } else if(e === 105) {
      this.advanceRightCaterpillar();
    } else if(e === 97) {
      this.fallBackLeftCaterpillar();
    } else if(e === 99) {
      this.fallBackRightCaterpillar();
    } else if(e === 100) {
      this.stopLeftCaterpillar();
    } else if(e === 102) {
      this.stopRightCaterpillar();
    }
  },
  upPower: function(){
    this.engineSpeed++;
  },
  downPower: function(){
    this.engineSpeed--;
  },
  advanceLeftCaterpillar: function(){
    this.leftCaterpillarDirection = 1;
  },
  advanceRightCaterpillar: function(){
    this.rightCaterpillarDirection = 1;
  },
  stopLeftCaterpillar: function(){
    this.leftCaterpillarDirection = 0;
  },
  stopRightCaterpillar: function(){
    this.rightCaterpillarDirection = 0;
  },
  fallBackLeftCaterpillar: function(){
    this.leftCaterpillarDirection = -1;
  },
  fallBackRightCaterpillar: function(){
    this.rightCaterpillarDirection = -1;
  },
  onKeyUp: function(e) {
  }

});


