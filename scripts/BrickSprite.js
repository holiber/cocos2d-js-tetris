!function(ctx) {

  var BrickSprite = ctx.BrickSprite = cc.Sprite.extend({
    ctor: function () {
      this._super('sprites/brick.png');
      this.setContentSize(BrickSprite.WIDTH, BrickSprite.HEIGHT);
    }
  });
  BrickSprite.WIDTH = 14.2;
  BrickSprite.HEIGHT = 14.2;

}(window);