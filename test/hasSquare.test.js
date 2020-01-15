const assert = require('chai').assert;
const hasSquare = require('../js/index');

describe('hasSquare', () => {
  it('detects that it has a square', () => {
    assert.isTrue(hasSquare([[1,1], [1,2], [1,3]], [1,1]), true);
    assert.isTrue(hasSquare([[1,1], [1,2], [1,3],[2,2]], [1,3]), true);
  });
  it('detects that it has no squares', () => {
    assert.isFalse(hasSquare([[1,1], [1,2], [1,3]], [1,4]));
    assert.isFalse(hasSquare([[1,1], [1,2], [1,3],[2,2]], [1,0]));
  });
});