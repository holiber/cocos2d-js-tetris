!function (ctx) {

  /**
   * Main game scene
   */
  var TetrisScene = ctx.TetrisScene = cc.Scene.extend({

    ctor: function () {
      this._super();
      this.grid = null;
      this.nextTetrimino = null;
      this.pointsLabel = null;
      this.levelLabel = null;
      this.linesLabel = null;
      cc.game.state = new GameState(); // it sucks, in ideal world we must override cc.Game and put it there
    },

    onEnter: function () {
      this._super();
      var size = cc.director.getWinSize();
      var background = cc.Sprite.create("sprites/background.png");
      background.setPosition(size.width / 2, size.height / 2);
      background.setScale(0.5);
      this.addChild(background, 0);
      this.grid = new Grid();
      this.grid.setPosition(74, 70);
      this.addChild(this.grid);

      // cc.eventManager.addListener not work in lite version =(
      window.addEventListener('keydown', this.onKeyDown.bind(this));
      window.addEventListener('keyup', this.onKeyUp.bind(this));


      this.pointsLabel = cc.LabelTTF.create("111", "Arial");
      this.pointsLabel.setColor(new cc.Color(0, 0, 0));
      this.pointsLabel.setPosition(size.width - 100, size.height - 130);
      this.addChild(this.pointsLabel);

      this.levelLabel = cc.LabelTTF.create("111", "Arial");
      this.levelLabel.setColor(new cc.Color(0, 0, 0));
      this.levelLabel.setPosition(size.width - 100, size.height - 250);
      this.addChild(this.levelLabel);

      this.linesLabel = cc.LabelTTF.create("111", "Arial");
      this.linesLabel.setColor(new cc.Color(0, 0, 0));
      this.linesLabel.setPosition(size.width - 100, size.height - 210);
      this.addChild(this.linesLabel);

      this.scheduleUpdate();
    },

    update: function(dt) {
      var gameState = cc.game.state;
      var needToPushNextTetrimino = !this.grid.tetrimino && this.nextTetrimino;

      if (needToPushNextTetrimino) {
        this.removeChild(this.nextTetrimino);
        this.grid.pushTetrimino(this.nextTetrimino);
        delete this.nextTetrimino;
      }

      // generate next tetrimino
      if (!this.nextTetrimino) {
        var tet = new Tetrimino(gameState.speed);
        this.addChild(tet);
        tet.setPosition(223 + tet.width / 2, 70 + tet.height / 2);
        this.nextTetrimino = tet;
      }

      this.grid.update(dt);
      this.linesLabel.setString(gameState.lines);
      this.pointsLabel.setString(gameState.points);
      this.levelLabel.setString(gameState.level);
      var needChangeLevel = gameState.check();

      if (needChangeLevel) {
        this.removeChild(this.nextTetrimino);
        delete this.nextTetrimino;
        this.grid.setLevel(gameState.level);
      }

      cc.game.keyboardEvent = null;
    },

    onKeyDown: function (ev) {
      ev.preventDefault();
      cc.game.keyboardEvent = ev;
    },

    onKeyUp: function (ev) {
      cc.game.keyboardEvent = ev;
    }

  });
}(window);