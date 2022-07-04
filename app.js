const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware')
const handleRequests = require('./rabbit/handleRequests');

const app = express(); const port = 8080

// middleware
app.use(express.static(__dirname +'/public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

const dbURI = "mongodb+srv://danielmarmor:Daniel0578@cluster0.wil68.mongodb.net/Users";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(async(result) => {
    console.log('Connected To Users Database') ;
    await handleRequests.initReuqests();   
    app.listen(3000, () => console.log(`Listening to port ${3000}`))
  })
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) =>{
    const emailParam =  {email : res.locals.user.email};
    res.render('smoothies',emailParam);
});
app.use(authRoutes);

// cookies
/*
app.get('/set-cookies', (req, res) => {
  // res.setHeader('Set-Cookie', 'newUser=true');
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
  res.send('you got the cookies!');
});

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});
*/
