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
  handleSocketMessage: function(messageId, messageData){
    
    if (messageId === "keypress"){

      var e = messageData;
   
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
    }

  },
  update: function() {
    this.setRotation(this.currentRotation);
  },
  handleKey: function(e) {
    socketClient.sendMessage("keypress", e);
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


