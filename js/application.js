var game;
// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
    game = new GameManager(8, KeyboardInputManager, HTMLActuator, LocalStorageManager);

    // TODO: This code is in need of a refactor (along with the rest)
    var storage = new LocalStorageManager;
});

var last = '';
var dir = 0;
var cnt = 0;
var mover = undefined;

function doMovementPattern(moveType) {
  if (typeof(mover) != 'undefined') {
    clearInterval(mover);
  }
  mover = setInterval(moveType, 50);
}

function stopMovement() {
  if (typeof(mover) != 'undefined') {
    clearInterval(mover);
    mover = undefined;
  }
}

function corner() {
  if (game == null || typeof(game) === "undefined") {
    return;
  }
  var item = document.querySelector('.tile-container');
  if (item.innerHTML == last) {
    if (++cnt > 0) {
      dir = 1 - dir;
      cnt = 0;
    }
  }
  last = item.innerHTML;
  if (0 === dir) {
    game.move(0);
    setTimeout(function() {game.move(3)}, 20);
  } else {
    game.move(0);
    setTimeout(function() {game.move(1)}, 20);
  }
}

function swing() {
  if (game == null || typeof(game) === "undefined") {
    return;
  }
  var item = document.querySelector('.tile-container');
  if (item.innerHTML == last) {
    if (++cnt > 0) {
      dir = 1 - dir;
      cnt = 0;
    }
  }
  last = item.innerHTML;
  if (0 === dir) {
    game.move(0);
    setTimeout(function() {game.move(2)}, 20);
  } else {
    game.move(1);
    setTimeout(function() {game.move(3)}, 20);
  }
}

function swirl() {
  dir = (dir + 1) % 4;
  game.move(dir);
}

function random() {
  game.move(Math.floor(Math.random() * 4));
}
