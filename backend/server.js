const express = require('express');
const PORT = process.env.PORT || 4000;
const app = express();
const parser = require('cookie-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

app.use(express.json());
app.use(parser());
app.use(cors());

app.get('/getData', (req, res) => {
    const url = `https://xkcd.com/${(req.query.Num)}/info.0.json`;
    fetch(url)
    .then(body => body.text())
    .then(response => res.send(response));
})

app.use(express.static(path.join(__dirname, '..\\build\\')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..\\build\\', '/index.html'));
});

app.listen(PORT, () => {
    console.log("Listening to Port: " + PORT);
});