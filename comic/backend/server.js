const express = require('express');
const PORT = process.env.PORT || 4000;
const app = express();
const parser = require('cookie-parser');
const cors = require('cors');
const fetch = require('node-fetch');

app.use(express.json());
app.use(parser());
app.use(cors());

app.get('/getData', (req, res) => {
    const url = `https://xkcd.com/${(req.query.Num)}/info.0.json`;
    fetch(url)
    .then(body => body.text())
    .then(response => res.send(response));
})

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('comic/build'))
}



app.listen(PORT, () => {
    console.log("Listening to Port: " + PORT);
});