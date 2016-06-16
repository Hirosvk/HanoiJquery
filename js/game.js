function Game (num) {
  this.num = num;
  let firstTower = [];
  for (let i = 1; i <= num; i++){
    firstTower.unshift(i);
  }
  this.towers = [firstTower, [], []];
}

Game.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
    const startTower = this.towers[startTowerIdx];
    const endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      const topStartDisc = startTower[startTower.length - 1];
      const topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
};

Game.prototype.isWon = function(){
    // move all the discs to the last or second tower
    return (this.towers[2].length == this.num) || (this.towers[1].length == this.num);
};


Game.prototype.move = function(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
};


Game.prototype.print = function(){
    console.log(JSON.stringify(this.towers));
};


Game.prototype.promptMove = function(reader, callback) {
    this.print();
    reader.question("Enter a starting tower: ", start => {
      const startTowerIdx = parseInt(start);
      reader.question("Enter an ending tower: ", end => {
        const endTowerIdx = parseInt(end);
        callback(startTowerIdx, endTowerIdx);
      });
    });
};

Game.prototype.run = function(reader, gameCompletionCallback) {
    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("Invalid move!");
      }

      if (!this.isWon()) {
        // Continue to play!
        this.run(reader, gameCompletionCallback);
      } else {
        this.print();
        console.log("You win!");
        gameCompletionCallback();
      }
    });
};

module.exports = Game;
