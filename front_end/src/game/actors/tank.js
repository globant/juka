var Tank = cc.Sprite.extend({
   _currentRotation:0,
   ctor:function(){
       this._super();
       this.initWithFile("resources/images/tank.png");
   },
   update:function(){
       this.setRotation(this._currentRotation);
   },
   handleKey:function(e){
       if (e === cc.KEY.left){
           this._currentRotation-=10;
       }else if(e === cc.KEY.right){
           this._currentRotation+=10;
       }else if(e === cc.KEY.up){
           var newX = this.getPositionX() + Math.cos(this._currentRotation * Math.PI/180) * 10;
           var newY = this.getPositionY() - Math.sin(this._currentRotation * Math.PI/180) * 10;
           
           this.setPositionX(newX);
           this.setPositionY(newY);
       
       }else if(e === cc.KEY.down){
           var newX = this.getPositionX() - Math.cos(this._currentRotation * Math.PI/180) * 10;
           var newY = this.getPositionY() + Math.sin(this._currentRotation * Math.PI/180) * 10;
           
           this.setPositionX(newX);
           this.setPositionY(newY);
           
       }
       if(this._currentRotation < 0) this._currentRotation = 360;
       if(this._currentRotation > 360) this._currentRotation = 0;
  }
   
});


