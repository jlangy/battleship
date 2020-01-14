const assert = require('chai').assert;
const game = require('../js/index');
const onBoard = game.onBoard;
const playerBoard = game.playerBoard;
console.log(game.placingPhase);

describe('onBoard', () => {
  it('should add to players ships', () => {
    game.placingPhase.shipOrientation = 0;
    game.placingPhase.selectedShip = 'destroyer';
    assert.equal(onBoard([4,1]), true);
  })
});