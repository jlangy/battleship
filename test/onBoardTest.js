const assert = require('chai').assert;
const game = require('../js/index');
const playerBoard = game.playerBoard;
console.log(game.placingPhase);

describe('onBoard', () => {
  describe('placing with north orientation', () => {
    it('should return true if ship is on the board', () => {
      game.placingPhase.shipOrientation = 0;
      game.placingPhase.selectedShip = 'destroyer';
      assert.isTrue(game.onBoard([4,1]));
      game.placingPhase.selectedShip = 'destroyer';
      assert.isTrue(game.onBoard([9,9]));
      game.placingPhase.selectedShip = 'submarine';
      assert.isTrue(game.onBoard([3,5]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isTrue(game.onBoard([3,6]));
      game.placingPhase.selectedShip = 'battleship';
      assert.isTrue(game.onBoard([4,0]));
      game.placingPhase.selectedShip = 'carrier';
      assert.isTrue(game.onBoard([5,1]));
    });
    it('should return false if ship is off the board', () => {
      game.placingPhase.selectedShip = 'destroyer';
      assert.isFalse(game.onBoard([1,1]));
      game.placingPhase.selectedShip = 'destroyer';
      assert.isFalse(game.onBoard([1,8]));
      game.placingPhase.selectedShip = 'submarine';
      assert.isFalse(game.onBoard([2,1]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isFalse(game.onBoard([2,9]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isFalse(game.onBoard([0,1]));
      game.placingPhase.selectedShip = 'battleship';
      assert.isFalse(game.onBoard([3,1]));
      game.placingPhase.selectedShip = 'carrier';
      assert.isFalse(game.onBoard([4,9]));
    });
  });
  describe('placing with east orientation', () => {
    it('should return true if ship is on the board', () => {
      game.placingPhase.shipOrientation = 1;
      game.placingPhase.selectedShip = 'destroyer';
      assert.isTrue(game.onBoard([4,7]));
      game.placingPhase.selectedShip = 'destroyer';
      assert.isTrue(game.onBoard([9,7]));
      game.placingPhase.selectedShip = 'submarine';
      assert.isTrue(game.onBoard([3,5]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isTrue(game.onBoard([3,3]));
      game.placingPhase.selectedShip = 'battleship';
      assert.isTrue(game.onBoard([4,5]));
      game.placingPhase.selectedShip = 'carrier';
      assert.isTrue(game.onBoard([5,4]));
    });
    it('should return false if ship is off the board', () => {
      game.placingPhase.selectedShip = 'destroyer';
      assert.isFalse(game.onBoard([1,9]));
      game.placingPhase.selectedShip = 'destroyer';
      assert.isFalse(game.onBoard([1,8]));
      game.placingPhase.selectedShip = 'submarine';
      assert.isFalse(game.onBoard([2,8]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isFalse(game.onBoard([2,9]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isFalse(game.onBoard([0,9]));
      game.placingPhase.selectedShip = 'battleship';
      assert.isFalse(game.onBoard([3,6]));
      game.placingPhase.selectedShip = 'carrier';
      assert.isFalse(game.onBoard([4,5]));
    });
  });
  describe('placing with south orientation', () => {
    it('should return true if ship is on the board', () => {
      game.placingPhase.shipOrientation = 2;
      game.placingPhase.selectedShip = 'destroyer';
      assert.isTrue(game.onBoard([4,1]));
      game.placingPhase.selectedShip = 'destroyer';
      assert.isTrue(game.onBoard([7,9]));
      game.placingPhase.selectedShip = 'submarine';
      assert.isTrue(game.onBoard([3,5]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isTrue(game.onBoard([4,6]));
      game.placingPhase.selectedShip = 'battleship';
      assert.isTrue(game.onBoard([0,0]));
      game.placingPhase.selectedShip = 'carrier';
      assert.isTrue(game.onBoard([4,1]));
    });
    it('should return false if ship is off the board', () => {
      game.placingPhase.selectedShip = 'destroyer';
      assert.isFalse(game.onBoard([9,1]));
      game.placingPhase.selectedShip = 'destroyer';
      assert.isFalse(game.onBoard([8,8]));
      game.placingPhase.selectedShip = 'submarine';
      assert.isFalse(game.onBoard([7,1]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isFalse(game.onBoard([7,9]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isFalse(game.onBoard([9,1]));
      game.placingPhase.selectedShip = 'battleship';
      assert.isFalse(game.onBoard([6,1]));
      game.placingPhase.selectedShip = 'carrier';
      assert.isFalse(game.onBoard([5,9]));
    });
  });
  describe('placing with west orientation', () => {
    it('should return true if ship is on the board', () => {
      game.placingPhase.shipOrientation = 3;
      game.placingPhase.selectedShip = 'destroyer';
      assert.isTrue(game.onBoard([4,2]));
      game.placingPhase.selectedShip = 'destroyer';
      assert.isTrue(game.onBoard([9,2]));
      game.placingPhase.selectedShip = 'submarine';
      assert.isTrue(game.onBoard([3,3]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isTrue(game.onBoard([3,6]));
      game.placingPhase.selectedShip = 'battleship';
      assert.isTrue(game.onBoard([4,7]));
      game.placingPhase.selectedShip = 'carrier';
      assert.isTrue(game.onBoard([5,5]));
    });
    it('should return false if ship is off the board', () => {
      game.placingPhase.selectedShip = 'destroyer';
      assert.isFalse(game.onBoard([1,1]));
      game.placingPhase.selectedShip = 'destroyer';
      assert.isFalse(game.onBoard([6,1]));
      game.placingPhase.selectedShip = 'submarine';
      assert.isFalse(game.onBoard([2,1]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isFalse(game.onBoard([2,2]));
      game.placingPhase.selectedShip = 'cruiser';
      assert.isFalse(game.onBoard([0,1]));
      game.placingPhase.selectedShip = 'battleship';
      assert.isFalse(game.onBoard([3,3]));
      game.placingPhase.selectedShip = 'carrier';
      assert.isFalse(game.onBoard([4,4]));
    });
  });
});