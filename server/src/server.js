const express = require('express');
const { validateWord } = require('./validateWord');

const path = require('path');

let app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/check', (req, res) => {
  const word = req.query.word;
  if (!word) {
    res.sendStatus(400);
  }  else {
    validateWord(word).then((valid) => {
      if(valid) {
        res.sendStatus(200);
      } else {
        res.sendStatus(204);
      }
    }).catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
  }
});

app.listen(port, () => {
  console.log('Server restarted at: ', new Date().toString());
});
