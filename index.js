const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var passport = require('passport') , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: '516145145497747',
clientSecret: '5a9892cfdbfa2fef09f7b748032939cf' ,
callbackURL: "https://powerful-ravine-93053.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
  }
));

app = express();

  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  
  app.get('/', (req, res) => res.render('pages/index'));
  app.get('/login', (req, res) => res.render('pages/index'));



  // Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
