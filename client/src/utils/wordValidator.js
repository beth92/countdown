import axios from 'axios';

export default async function validateWord(word, letters) {
  const lettersNotFound = word.split('').filter(letter => {
    return letters.indexOf(letter) === -1;
  });
  if (lettersNotFound.length === 0) {
    const checkRealWord = await axios.get(`/check?word=${word}`);
    if (checkRealWord.status === 204) {
      console.log(`${word} is not a valid word.`);
    }
    return checkRealWord.status === 200;
  } else {
    return false;
  }
}
