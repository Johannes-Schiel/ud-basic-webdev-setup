const test = require('./main');

test('adds 1 + 2 to equal 3', () => {
    expect(test(1, 2)).toBe(3);
});