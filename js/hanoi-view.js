function HanoiView(game, $html) {
  this.game = game;
  this.$html = $html;
  this.setupTowers();
  this.render();
}

HanoiView.DISKCOLORS = {
  1: 'blue',
  2: 'green',
  3: 'purple',
  4: 'red',
  5: 'orange',
  6: 'yellow',
  7: 'pink'
};

HanoiView.prototype.setupTowers = function () {
  let $game = $("<game></game>");
  for(let i = 0; i < 3; i++){
    let $ul = $(`<ul id=${i}></ul>`);
    $ul.on("click", (event) => {
      let clickedTower = $(event.currentTarget);
      this.clickTower(clickedTower.attr("id"));
    });
    $ul.append(`Tower ${i}`);
    $game.append($ul);
  }
  this.$html.append($game);
};

HanoiView.prototype.render = function(){
  $('li').remove();
  this.game.towers.forEach((tower, index) => {
    let ul = $("game").children().get(index);
    tower.forEach(ring => {
      let $li = $("<li></li>");
      $li.css("width", `${ring * 30}px`);
      $li.css("background-color", HanoiView.DISKCOLORS[ring]);
      $(ul).prepend($li);
    });
  });
};


HanoiView.prototype.clickTower = function(clickedTowerId){
  if(this.picked === undefined) { this.picked = false; }
  if( this.picked === false ) {
    this.fromTower = clickedTowerId;
    this.picked = true;

  }else{
    let moved = this.game.move(this.fromTower, clickedTowerId);
    this.picked = false;
    this.fromTower = undefined;

    if (!moved) {
      alert("Invalid Move!");
    }
  }
  this.render();

  if ( this.game.isWon() ){
    alert("good job!! yay!");
  }
};

module.exports = HanoiView;
