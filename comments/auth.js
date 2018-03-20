const express = require('express');
const path = require('path');
const app = express();
const config = require("./config");
const dbLocation = path.join(__dirname, config.database);
const Keygrip = require('keygrip');
const passport = require('passport');
const cookieSession = require('cookie-session')
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const log = require("./logger");
const userModule = require("./lib/userModule/userModule");
userModule.init(dbLocation, log);

app.use(cookieSession({
    name: 'session',
    keys: new Keygrip([config.auth.secrets[0], config.auth.secrets[1]], 'SHA384', 'base64'),
    domain: config.domain
}))

app.use(passport.initialize());
app.use(passport.session());

passport.deserializeUser((user, done) => {        
    userModule.findUser(user.provider, user.id)
    .then((user) => {
        done(null, user)
    })
    .catch(err => {
        done(err, null)
    });
});

passport.serializeUser((user, done) => {
    done(null, {
        provider: user.provider,
        id: user.provider_id
    });
});

passport.use(new FacebookStrategy({
    clientID: config.auth.facebook.clientID,
    clientSecret: config.auth.facebook.clientSecret,
    callbackURL: `http://${config.domain}/auth/facebook/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    userModule.getUser(profile).then(user => {
        done(null, user);
    })
  }
));

passport.use(new GoogleStrategy({
    clientID: config.auth.google.clientID,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: `http://${config.domain}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    userModule.getUser(profile).then(user => {
        return done(null, user);
    })
  }
));

app.get('/auth/success', (req, res) => {
    res.send(`<script>window.opener.window.cmt.getComments(); window.close()</script>`)
});

app.get('/auth/failure', (req, res) => {
    res.send(`<script>window.opener.alert('authentication failed, please try again'); window.close()</script>`)
});

app.get('/auth/logout', (req, res) => {
    req.logout();
    res.status(200).json({ok: true})
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/google', passport.authenticate('google',  { scope : ['profile', 'email'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: `/auth/success`,
                                      failureRedirect: `/auth/failure` }));
app.get('/auth/google/callback', 
    passport.authenticate('google', { successRedirect: `/auth/success`,
                                        failureRedirect: `/auth/failure` }));
module.exports = {
    app
}