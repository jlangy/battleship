const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const {scores} = require('./data');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.post('/register', (req,res) => {
  const { username, score } = req.body;
  scores.push({username, score})
  res.redirect('/leaderboard');
});

app.get('/leaderboard', (req,res) => {
  const templateVars = {scores};
  res.render('leaderboard', templateVars);
});


app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});