'use strict';

let gameBoard = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
let count = 0;
let playerXWins = 0;
let playerOWins = 0;

let Game = function (board) {
  this.gameBoard = board;
  this.count = 0;
};

Game.prototype.winCondition = function (player, indexOne, indexTwo, indexThree) {
  return (indexOne === player) && (indexTwo === player) && (indexThree === player);
};

Game.prototype.checkHorizontalWin = function (player) {
  return this.winCondition(player, gameBoard[0], gameBoard[1], gameBoard[2]) ||
         this.winCondition(player, gameBoard[3], gameBoard[4], gameBoard[5]) ||
         this.winCondition(player, gameBoard[6], gameBoard[7], gameBoard[8]);
};

Game.prototype.checkDiagonalWin = function (player) {
  return this.winCondition(player, gameBoard[0], gameBoard[4], gameBoard[8]) ||
         this.winCondition(player, gameBoard[2], gameBoard[4], gameBoard[6]);
};

Game.prototype.checkVerticalWin = function (player) {
  return this.winCondition(player, gameBoard[0], gameBoard[3], gameBoard[6]) ||
         this.winCondition(player, gameBoard[1], gameBoard[4], gameBoard[7]) ||
         this.winCondition(player, gameBoard[2], gameBoard[5], gameBoard[8]);
};

Game.prototype.displayBoard = function () {
  for (let i = 0; i < this.gameBoard.length; i += 3) {
    console.log(this.gameBoard[i] + ' | ' + this.gameBoard[i + 1] + ' | ' + this.gameBoard[i + 2]);
  }
};

Game.prototype.playerTurn = function () {
  if (this.count % 2 === 0) {
    console.log('Player X select index to mutate');
  } else {
    console.log('Player O select index to mutate');
  }
  this.displayBoard();
};

Game.prototype.resetGame = function () {
  this.gameBoard = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
  this.count = 0;
  this.playerTurn(count);
};

Game.prototype.executeGame = function () {
  this.resetGame();
  if (this.count % 2 === 0) {
    console.log('Player X select index to mutate');
  } else {
    console.log('Player O select index to mutate');
  }
};

Game.prototype.checkWinner = function () {
  if (this.checkHorizontalWin('x') || this.checkVerticalWin('x') || this.checkDiagonalWin('x')) {
    console.log('X is the winner');
    this.displayBoard();
    playerXWins += 1;
    return true;
  } else if (this.checkHorizontalWin('o') || this.checkVerticalWin('o') || this.checkDiagonalWin('o')) {
    this.displayBoard();
    console.log('O is the winner');
    playerOWins += 1;
    return true;
  } else if (this.count === 9) {
    this.displayBoard();
    console.log('Draw!');
  } else {
    this.playerTurn(count);
  }
};

Game.prototype.mutateBoard = function (index) {
  if (this.count % 2 === 0 && this.gameBoard[index] === '_') {
    this.gameBoard[index] = 'x';
    this.count ++;
  } else if (this.count % 2 !== 0 && this.gameBoard[index] === '_') {
    this.gameBoard[index] = 'o';
    this.count ++;
  } else {
    console.log('Select another spot:');
  }
  this.checkWinner();
};

module.export = {
  gameBoard,
  count,
  Game,
  playerXWins,
  playerOWins
};
