const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();


app.set('views', path.join(__dirname, '..', 'frontend'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.get('/', (req,res) => {//home page handling get requests with response to render
res.render('main');
});

app.listen(4000, () => {
console.log('server listening on port 4000')
});
