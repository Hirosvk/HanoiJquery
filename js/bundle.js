/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);
	
	$( () => {
	  const rootEl = $('.hanoi');
	  debugger;
	  $("#startButton").on('click', () => {
	    $('game').remove();
	    let numDisk = $("#diskNum").val();
	    console.log(numDisk);
	    const game = new HanoiGame(numDisk);
	    let view = new HanoiView(game, rootEl);
	  });
	
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map