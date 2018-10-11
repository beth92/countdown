import axios from 'axios';

export default async function validateWord(word, letters) {
  const lettersNotFound = word.split('').filter(letter => {
    return letters.indexOf(letter) === -1;
  });
  if (lettersNotFound.length === 0) {
    const checkRealWord = await axios.get(`/check?word=${word}`);
    return checkRealWord.data;
  } else {
    return undefined;
  }
}
