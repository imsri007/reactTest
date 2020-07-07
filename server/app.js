const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(__dirname));
app.use(cors());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

app.post('/upload', (req, res, next) => {
  let textFile = req.files.file;

  textFile.mv(`${__dirname}/public/${req.body.filename}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    var data = fs.readFileSync(`public/${req.body.filename}`, 'utf8');
    console.log("Data of uploaded text file is", data);
    res.json({file: data });
  });
});

app.listen(8000, () => {
  console.log('8000');
});

module.exports = app;
