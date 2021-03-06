'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();

function Checker(color) {
  if (color === 'white')  {
    this.symbol = String.fromCharCode(0x125CB);
    return this.symbol;
  }
  else {
    this.symbol = String.fromCharCode(0x125CF);
    return this.symbol;
  }
}


function Board() {
    this.grid = [];
    // creates an 8x8 array, filled with null values
    this.createGrid = function() {
        // loop to create the 8 rows
        for (var row = 0; row < 8; row++) {
            this.grid[row] = [];
            // push in 8 columns of nulls
            for (var column = 0; column < 8; column++) {
                this.grid[row].push(null);
            }
        }
    };

    // prints out the board
    this.viewGrid = function() {
        // add our column numbers
        var string = "  0 1 2 3 4 5 6 7\n";
        for (var row = 0; row < 8; row++) {
            // we start with our row number in our array
            var rowOfCheckers = [row];
            // a loop within a loop
            for (var column = 0; column < 8; column++) {
                // if the location is "truthy" (contains a checker piece, in this case)
                if (this.grid[row][column]) {
                    // push the symbol of the check in that location into the array
                    rowOfCheckers.push(this.grid[row][column].symbol);
                } else {
                    // just push in a blank space
                    rowOfCheckers.push(' ');
                }
            }
            // join the rowOfCheckers array to a string, separated by a space
            string += rowOfCheckers.join(' ');
            // add a 'new line'
            string += "\n";
        }
        console.log(string);
    };

    this.selectChecker = function(row, column)  {
      // if (this.grid[row][column] === null)  {
      //   console.log("try again!");
      //   return false;
      // }
      // else
        return this.grid[row][column];
    };

    this.checkers = [];


    this.createCheckers = function(){

     var jump = false;
     var tab  = true;

     for (var row = 0; row < 8; row++) {
         // a loop within a loop
         for (var column = 0; column < 8; column++) {
             // jump and insert white positions
               if (jump) {
                   if (row <= 2 ) {
                     var newChecker  = new Checker('white');
                   } else {
                     if (row >= 5) {
                       var newChecker  = new Checker('black');
                     } else {
                       var newChecker = null;
                     }
                   }
                   // push the symbol color
                   // rowOfCheckers.push(color);
                   if (newChecker) {
                     if (tab) {this.grid[row][column] = newChecker;
                     } else {
                       this.grid[row][column - 1] = newChecker;
                     }
                     this.checkers.push(newChecker);
                   }
               }
             jump = !jump;
         }
         tab = !tab;
     }
   };
   this.killChecker = function(row, column)  {
     this.selectChecker(row, column);
     var findRow = this.checkers.indexOf(row),
         findCol = this.checkers.indexOf(column);
     this.checkers.splice(this.checkers[findRow], 1);
    //  this.checkers.splice(this.checkers[findCol], 1);
     this.grid[row][column] = null;
   };
}

function Game() {

    this.board = new Board();

    this.start = function() {
        this.board.createGrid();
        this.board.createCheckers();
    };

    this.moveChecker = function(start, end) {
      //convert string to number, push to array
      //split input into [row][column]
      start = parseInt(start);
      end = parseInt(end);
      var startSplit = [],
          endSplit = [];
      while (start > 0) {
        startSplit[startSplit.length] = start % 10;
        start = parseInt(start / 10);
      }
      startSplit.reverse();
      while (end > 0) {
        endSplit[endSplit.length] = end % 10;
        end = parseInt(end / 10);
      }
      endSplit.reverse();
      var startRow = startSplit[0],
          startCol = startSplit[1],
          endRow = endSplit[0],
          endCol = endSplit[1];
      // console.log(startRow, startCol, endRow, endCol);

      var checker = game.board.selectChecker(startRow, startCol);
      game.board.grid[startRow][startCol] = null;
      game.board.grid[endRow][endCol] = checker;
      if (Math.abs(startRow - endRow) === 2)  {
        var midRow, midCol;
        if (startRow > endRow)  {
          midRow = startRow - 1;
        }
        if (startRow < endRow)  {
          midRow = startRow + 1;
        }
        if (startCol > endCol)  {
          midCol = startCol - 1;
        }
        if (startCol < endCol)  {
          midCol = startCol + 1;
        }
            game.board.killChecker(midRow, midCol);
      }


      //INPUT SCRUBBING - end should always be 11 +/- or 9 +/- of start
      ////
    };
}

function getPrompt() {
    game.board.viewGrid();
    prompt.get(['which piece?', 'to where?'], function (error, result) {
        game.moveChecker(result['which piece?'], result['to where?']);
        getPrompt();
    });
}

var game = new Game();
game.start();


// Tests

if (typeof describe !== 'undefined') {
    describe('Game', function() {
        it('should have a board', function() {
            assert.equal(game.board.constructor.name, 'Board');
        });
        it('board should have 24 checkers', function() {
            assert.equal(game.board.checkers.length, 24);
        });
    });

    describe('Game.moveChecker()', function () {
        it('should move a checker', function () {
            assert(!game.board.grid[4][1])
            game.moveChecker('50', '41');
            assert(game.board.grid[4][1]);
            game.moveChecker('21', '30');
            assert(game.board.grid[3][0]);
            game.moveChecker('52', '43');
            assert(game.board.grid[4][3]);
        });
        it('should be able to jump over and kill another checker', function() {
            game.moveChecker('30', '52');
            assert(game.board.grid[5][2]);
            assert(!game.board.grid[4][1]);
            assert.equal(game.board.checkers.length, 23);
        });
    });
} else {
    getPrompt();
}
