const express = require('express');
const path = require('path');
const app = express();
const config = require("./config");
const dbLocation = path.join(__dirname, config.database);
const Keygrip = require('keygrip');
const passport = require('passport');
const cookieSession = require('cookie-session')
const FacebookStrategy = require('passport-facebook').Strategy;
const log = require("./logger");
const userModule = require("./lib/userModule/userModule");
userModule.init(dbLocation, log);

app.use(cookieSession({
    name: 'session',
    keys: new Keygrip([config.secrets[0], config.secrets[1]], 'SHA384', 'base64'),
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
    clientID: '1885955061416949',
    clientSecret: '1ad63939891880998564fcc2d709b3ed',
    callbackURL: "http://localhost:4000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    userModule.getUser(profile).then(user => {
        done(null, user);
    })
  }
));

app.get('/auth/success', (req, res) => {
    res.send(`<script>window.opener.window.cmt.getComments(); window.close()</script>`)
});

app.get('/auth/failure', (req, res) => {
    res.send(`<script>window.opener.alert('authentication failed, please try again'); window.close()</script>`)
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/auth/success',
                                      failureRedirect: '/auth/failure' }));

module.exports = {
    app
}