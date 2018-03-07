const express = require('express');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const helpers = require("./ejs/helpers");
const app = express();
const config = require("./config")

app.use(express.static(path.join(__dirname, 'avatars')));
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/comments/:post', function (req, res) {
    const post = req.params.post;
    const containerTemplate = path.join(__dirname, 'ejs/', config.templates.comments)
    const postJson = readFile(`json/${post}.json`,{encoding: 'utf8'})
        .then(json => helpers.render(JSON.parse(json)['comments'], containerTemplate))
        .then(html => {
            res.send(html);
        });
});

app.listen(config.port, function () {
  console.log(`server running on port ${config.port}`);
});