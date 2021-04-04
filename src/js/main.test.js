const add = require('./main.js');
test('adds 1 + 2 to equal 3', () => {
    expect(add(2,5)).toBe(7);
});
