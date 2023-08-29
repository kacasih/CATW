const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const crypto = require('crypto');

const app = express();

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root2',
  password: 'newpassword2',
  database: 'catGame',
  socketPath: '/tmp/mysql.sock'
})



app.use(express.urlencoded({extended:'false'}));
app.use(express.json());

app.set('views', path.join(__dirname, '..', 'frontend'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.get('/', (req,res) => {//home page handling get requests with response to render
res.render('main');
});

app.get('/login', (req,res) => {
  res.render('login');
});

app.post('/login', async (req,res) => {
  const {email, password} = req.body;
  console.log(req.body);
  let connection;
  try {
    const connection = await pool.getConnection();
    console.log('successful database connection');
    const [loginresult] = await connection.execute('SELECT password FROM users WHERE email = ?', [email]);
    console.log(loginresult);
    if (loginresult.length > 0 &&password === loginresult[0].password) {
      res.redirect('/');
    }
    else {
      res.redirect('/login');
    }
    connection.release();
  } catch (error) {
    res.status(500);
  } 
});

app.get('/signup', (req,res) => {
  res.render('signup', {message: ''});
});

app.post('/signup', async (req,res) => {//asynchronous function so that multiple users can sign up at same time
    const {username, email, password, confirmpassword} = req.body;//get all values from signup form so they can be added to mysql
    console.log(req.body);
    let connection;//I was getting an error here because I only defined the connection within the try block which made the connection undefined in some cases 
    try {
      const connection = await pool.getConnection();
      console.log('success connecting');//just testing whether making a connection works before I do anything else
      const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?',[email]);
      if (rows.length > 0) {
        console.log('email already in use');
        res.render('signup', {message: 'email already in use'});
        return;
      } else if (password!=confirmpassword) {
          console.log('passwords do not match');
          res.render('signup', {message: 'password and confirm passsword do not match'});
          return;
        }

      const result = await connection.query('INSERT INTO users (username,email,password) VALUES (?,?,?)',[username, email, password]);
      res.render('signup', {message: 'Success signing up'});
      console.log("Database manipulated");
   
    } catch (error) {
      console.log('error connecting to database');
      res.status(500);
    } finally {
        if (connection) {
        connection.release();
        }
      }
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
