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
const db = new sqlite3.Database(dbLocation);
const log = require("./logger");

app.use(cookieSession({
    name: 'session',
    keys: new Keygrip([config.secrets[0], config.secrets[1]], 'SHA384', 'base64'),
    domain: config.domain
}))

app.use(passport.initialize());
app.use(passport.session());

passport.deserializeUser((user, done) => {        
    findUser(user.provider, user.id)
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
    getUser(profile).then(user => {
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

function findUser(provider, id) {        
    const sql = `SELECT id, name, display_name, provider, provider_id FROM users WHERE provider = ? AND provider_id = ?`;  
    return new Promise((resolve, reject) => {
        db.all(sql, [provider, id], (err, rows) => {
            if (err) {
                return reject(err);
            }
            if (!rows || rows.length === 0) {
                resolve(null);
            }else{
                resolve(rows[0]);
            }
        });
    });
    db.close();
}

function saveUser(data) {
    const sql = `INSERT INTO users (provider, provider_id, display_name, name) VALUES (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.all(sql, [data.provider, data.id, data.displayName, data.username || data.displayName], (err, rows) => {
            if (err) {
                return reject(err);
            }
            log.info(`New user - ${data.displayName} added`);
            resolve();
        });
    });
}

async function getUser(userData) {
    try{
        let result = await findUser(userData.provider, userData.id);
        if(!result) {
            log.info(`User - ${userData.displayName} not yet registered`);
            await saveUser(userData);
            result = await findUser(userData.provider, userData.id)
        }
        return result
    } catch(error) {
        log.error(error);
        return null
    }
}

module.exports = {
    app
}