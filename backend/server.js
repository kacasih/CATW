const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyparser = require('body-parser');

const app = express();


app.set('views', path.join(__dirname, '..', 'frontend'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.get('/', (req,res) => {//home page handling get requests with response to render
res.render('main');
});

app.get('/login', (req,res) => {
  res.render('login');
});


app.get('/signup', (req,res) => {
  res.render('signup');
});

app.get('/aboutus', (req,res) => {
  res.render('aboutus');
});

app.get('/contactus', (req,res) => {
  res.render('contactus');
});

app.get('/leaderboard', (req,res) => {
  res.render('leaderboard');
});
app.listen(4000, () => {
console.log('server listening on port 4000')
});
