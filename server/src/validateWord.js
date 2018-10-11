const axios = require('axios');
const { API_KEY } = require('./../config/api_key.json');

const validateWord = async (word) => {
  const res = await fetchDefinition(word);
  if (res.status === 200 && res.data && res.data.definitions) {
    return res.data.definitions[0];
  } else {
    return undefined;
  }
};

function fetchDefinition(word) {
  return axios.request({
    method: 'GET',
    headers: {
      'X-Mashape-Key': API_KEY,
      'X-Mashape-Host': 'wordsapiv1.p.mashape.com'
    },
    url: `https://wordsapiv1.p.mashape.com/words/${word}/definitions`,
    validateStatus: resolveIfStatusCode
  });
}

const resolveIfStatusCode = (status) => {
  return status >= 200 && status < 500;
};

module.exports = {
  validateWord
};
