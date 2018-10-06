const express = require('express');
// const fs = require('fs');
const path = require('path');

let app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.listen(port, () => {
  console.log('Server restarted at: ', new Date().toString());
});
