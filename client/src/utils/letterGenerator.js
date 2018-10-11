export default function generateLetters(n) {
  if (n <= 0 ){
    return;
  }
  const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
  const vowels = 'AEIOU';
  // method to init array of fixed size
  // http://2ality.com/2013/11/initializing-arrays.html
  return Array.apply(null, Array(n)).map(() => {
    return (Math.random() <= 0.33 ? getRandom(vowels) : getRandom(consonants));
  });
}

const getRandom = (letterSet) => {
  return letterSet.charAt(Math.floor(Math.random() * letterSet.length));
};
