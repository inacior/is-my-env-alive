const check = require('../../lib/check');

describe('check.js', () => {
  it('Return a instance of async function', () => {
    expect(check).toHaveProperty('default');
    expect(check.default).toBeInstanceOf(Function)
  });
})
