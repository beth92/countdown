import generateLetters from './../../src/utils/letterGenerator';

test('generates the correct length of array', () => {
  expect(generateLetters(10).length).toBe(10);
});
