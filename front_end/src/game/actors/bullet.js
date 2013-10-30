var Bullet = cc.Sprite.extend({
   _angle:0,
   _speed:0,
   ctor:function(initialPos, angle, speed){
       this._super();
       this._initialPosition = initialPos;
       this._angle = angle;
       this._speed = speed;
       this.initWithFile("resources/images/tank.png");
   },
   update:function(){
       var newX = newX + Math.cos(this._angle)* this._speed;
       var newY = newY + Math.sin(this._angle)* this._speed;
       this.setPositionX(newX);
       this.setPositionY(newY);
   }
});