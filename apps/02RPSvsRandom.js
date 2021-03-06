'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();


function threeChoices() {
 return (Math.random() < 0.33 ? 'Rock' :
       (Math.random() < 0.66 ?  'Paper'
                            : 'Scissors'));
}


function rockPaperScissors(hand1) {

var hand2 = threeChoices();

// Input Scrubbing
    hand1 = hand1.toLowerCase();
    hand1 = hand1.replace(/\s+/g, '');
    hand2 = hand2.toLowerCase();
    hand2 = hand2.replace(/\s+/g, '');

    var valid = ['rock','paper','scissors'];
    if (valid.indexOf(hand1) > -1 &&
        valid.indexOf(hand2) > -1)  {

// DEPRECATED INPUT CHECK:
// if (hand1 === 'rock' || hand1 === 'scissors' || hand1 === 'paper'
// &&  hand2 === 'rock' || hand2 === 'scissors' || hand2 === 'paper')  {

// Operations
      console.log("The computer chooses" + " " + hand2);

      if (hand1 === hand2)  {
        return "It\'s a tie!"
      }

      else if (
        (hand1 === 'rock' && hand2 === 'scissors') ||
        (hand1 === 'scissors' && hand2 === 'paper') ||
        (hand1 === 'paper' && hand2 === 'rock')
      ) {
        return "Hand one wins!";
      }

      else {
        return "Hand two wins!";
      }


      }
else {
  return "Please enter a valid input: Rock, Paper, or Scissors."
}
};

function getPrompt() {
    prompt.get(['hand1'], function (error, result) {

        console.log( rockPaperScissors(result['hand1']) );

        getPrompt();
    });
}

// Tests

if (typeof describe !== 'undefined') {

    describe('#rockPaperScissors()', function () {
        it('should detect a tie', function () {
            assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
            assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
            assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
        });
        it('should detect which hand won', function () {
            assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
            assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
            assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
        });
    });
} else {

    getPrompt();

}


// if (hand1 === hand2) {
//   return "It's a tie!";
// }
//
// else if (hand1 === 'rock')  {
//   if (hand2 === 'scissors') {
//     return "Hand one wins!";
//   }
// }
//
// else if (hand1 === 'paper') {
//   if (hand2 === 'rock') {
//       return "Hand one wins!";
//   }
// }
//
// else if (hand1 === 'scissors')
//   if (hand2 === 'paper')  {
//     return "Hand one wins!";
//   }
// else {
//     return "Hand two wins!";
//   }
// }
