
window.onload = function () {
  cc.game.onStart = function () {
    //load resources
    cc.LoaderScene.preload(["sprites/background.png", 'sprites/brick.png'], onResourcesLoad, this);
  };
  cc.game.run({
    "debugMode": 0,
    "frameRate": 60,
    "id": "gameCanvas",
    "renderMode": 1,
    "jsList": [],
    "width": 352,
    "height": 410,
    "showFPS": false
  });

  initMusic()
};

function onResourcesLoad() {
  var scene = new TetrisScene();
  cc.director.runScene(scene);
}

function initMusic() {
  var $audio = document.getElementById('audio');
  var $clickSound = window.$clickSound = document.getElementById('click-sound');
  var $clearSound = window.$clearSound = document.getElementById('clear-sound');
  var $levelupSound = window.$levelupSound = document.getElementById('levelup-sound');
  $audio.volume = 0.4;
  $clickSound.volume = 0.2;
  document.getElementsByClassName('ico-sound')[0].addEventListener('click', function () {
    if ($audio.paused) {
      $audio.play()
    } else {
      $audio.pause();
    }
  });
}