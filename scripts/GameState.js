!function(ctx) {

  var GameState = ctx.GameState = cc.Class.extend({

    ctor: function() {
      this.level = 0;
      this.points = 0;
      this.lines = 0;
      this.linesCountToLevelUp = 10;
      this.speed = GameState.INITIAL_SPEED;
      this.isGameOver = false;
    },

    addPointsForRowsCount: function (destroyedRowsCount) {
      this.lines += destroyedRowsCount;
      this.points += 1 * destroyedRowsCount * destroyedRowsCount;
    },

    setLevel: function(level) {
      this.lines = 0;
      this.level = level;
      this.speed = GameState.INITIAL_SPEED - (0.05 * level);
    },

    check: function() {
      if (this.lines >= this.linesCountToLevelUp) {
        this.setLevel(this.level + 1);
        $levelupSound.play();
        return true;
      }
      if (this.isGameOver) {
        this.setLevel(0);
        this.isGameOver = false;
        this.points = 0;
        return true;
      }
      return false;
    },

    gameOver: function () {
      this.isGameOver = true;
    }

  });

  GameState.INITIAL_SPEED = 0.5;

}(window);