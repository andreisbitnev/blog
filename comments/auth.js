const express = require('express');
const path = require('path');
const app = express();
const config = require("./config");
const dbLocation = path.join(__dirname, config.database);
const sqlite3 = require('sqlite3').verbose();
const Keygrip = require('keygrip');
const passport = require('passport');
const cookieSession = require('cookie-session')
const FacebookStrategy = require('passport-facebook').Strategy;

app.use(cookieSession({
    name: 'session',
    keys: new Keygrip([config.secrets[0], config.secrets[1]], 'SHA384', 'base64'),
    domain: config.domain
}))

app.use(passport.initialize());
app.use(passport.session());

passport.deserializeUser((user, done) => {
    let db = new sqlite3.Database(dbLocation);        
    let sql = `SELECT id, name, display_name, provider, provider_id FROM users WHERE provider = ? AND provider_id = ?`;    
    db.all(sql, [user.provider, user.id], (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        if (!rows || rows.length === 0) {
            return done(null, null);
        }else{
            return done(null, rows[0]);
        }
    });
    db.close();
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
    let db = new sqlite3.Database(dbLocation);        
    let sql = `SELECT id, name, display_name, provider, provider_id FROM users WHERE provider = ? AND provider_id = ?`;    
    db.all(sql, [profile.provider, profile.id], (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        if (!rows || rows.length === 0) {
            let sql = `INSERT INTO users (provider, provider_id, display_name, name) VALUES (?, ?, ?, ?)`;
            db.all(sql, [profile.provider, profile.id, profile.displayName, profile.username || profile.displayName], (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                let sql = `SELECT id, name, display_name, provider, provider_id FROM users WHERE provider = ? AND provider_id = ?`;
                db.all(sql, [profile.provider, profile.id], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }
                    done(null, rows[0]);
                });
            })
        }else{
            done(null, rows[0]);
        }
    });
    db.close();
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/privacy-policy',
                                      failureRedirect: '/' }));

module.exports = {
    app
}