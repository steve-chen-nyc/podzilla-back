'use strict';

const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;

// OAUTH AUTHENTICATION
const User = require('./models/user');

passport.use(new Strategy({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: '/users/login/twitter/return'
  },
  function(token, tokenSecret, profile, done) {
    console.log("hitting auth route");
    User.findOne({
        // query's data base to see if profile id_str matches.
      'id_str': profile.id
    }, function(err, user) {
      if (err) return done(err);

      if (!user) {
        user = new User({
          id_str: profile._json.id_str,
          name: profile._json.name,
          location: profile._json.location,
          profile_image_url: profile._json.profile_image_url,
          description: profile._json.description,
          provider: profile.provider,
          twitter: profile._json
      });
        user.save(function(err) {
          if (err) return (err);
          else
          return done(null, user);
          console.log('this is return user' + user)
        });
      }
      // need to redirect when route has been completed
          console.log('this is the returned data'  + user);
      return done(null, user);

    });
  }));

passport.serializeUser(function(user,cb) {
  cb(null,user);
});

passport.deserializeUser(function(obj,cb) {
  cb(null, obj);
});


const app = express();
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow_Headers", "Origin, X-Requested-with, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true)
  next();
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:8080'}));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(require('cookie-parser')());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'frontend')));


let podcast = require('./controllers/podcasts_controller');
app.use('/podcasts', podcast);

let user = require('./controllers/users_controller');
app.use('/users', user);

function sessionCleanup() {
    sessionStore.all(function(err, sessions) {
        for (var i = 0; i < sessions.length; i++) {
            sessionStore.get(sessions[i], function() {} );
        }
    });
}

app.get('/', (req,res) => {
  res.send('server running')
})


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/podcasts')

app.listen(process.env.PORT || 3000)
