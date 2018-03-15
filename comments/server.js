const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const config = require("./config");
const bodyParser = require('body-parser');
const db = path.join(__dirname, config.database);
const auth = require("./auth");
let templates = config.templates;
Object.entries(templates).forEach(([key, value]) => {
    templates[key] = path.join(__dirname, 'templates', value);
});
const getComments = require("./lib/getComments/middleware");
const renderTemplates = require("./lib/renderTemplates/middleware");
const postComment = require("./lib/postComment/middleware");
const createComment = require("./lib/createComment/middleware");

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.app);

app.get('/comments/:postName', [
    getComments(db),
    renderTemplates(templates)
]);

app.post('/comments/:postName', [
    getComments(db),
    createComment(templates),
    postComment(db)
]);

app.listen(config.port, function () {
  console.log(`server running on port ${config.port}`);
}); 