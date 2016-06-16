const HanoiGame = require('./game.js');
const HanoiView = require("./hanoi-view.js");

$( () => {
  const rootEl = $('.hanoi');
  $("#startButton").on('click', () => {
    $('game').remove();
    let numDisk = $("#diskNum").val();
    console.log(numDisk);
    const game = new HanoiGame(numDisk);
    let view = new HanoiView(game, rootEl);
  });

});
