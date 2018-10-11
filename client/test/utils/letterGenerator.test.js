import generateLetters from './../../src/utils/letterGenerator';

describe('test letter generating utils: letterGenerator.js', () => {
  test('generates the correct length of array', () => {
    expect(generateLetters(9).length).toBe(9);
    expect(generateLetters(100).length).toBe(100);
  });

  test('generates an array of uppercase A-Z characters', () => {
    const testLetters = generateLetters(9);
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    expect(typeof testLetters).toBe('object');
    testLetters.forEach(letter => {
      expect(validChars.indexOf(letter)).not.toBe(-1);
    });
  });

  test('should not do anything with a negative input', () => {
    expect(generateLetters(-1)).toBeUndefined();
  });
});
