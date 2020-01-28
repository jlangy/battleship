const express = require('express');
const app = express();
const PORT = 3000;
const cookieSession = require('cookie-session');
const generateRandomString = require('./public/js/helpers');
const bodyParser = require('body-parser');
const {scores} = require('./data');


app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(bodyParser.urlencoded({extended: true}));

app.use((req,res,next) => {
  if(!req.session.id){
    req.session.id = generateRandomString(6);
  }
  next();
});

app.use(express.static('public'));

//Set up a post request with a form (button) to enter username
//that will make a cookie. At the end of game, have a won game
//menu that can send a post request to add it to leaderboard
//using the cookie

app.post('/register', (req,res) => {
  const username = req.body.username;
  scores[username] = 0;
  res.redirect('/leaderboard');
});

app.get('/leaderboard', (req,res) => {
  res.send(JSON.stringify(scores));
});


app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});