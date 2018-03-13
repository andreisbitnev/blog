const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const config = require("./config");
const db = path.join(__dirname, config.database);
let templates = config.templates;
Object.entries(templates).forEach(([key, value]) => {
    templates[key] = path.join(__dirname, 'templates', value);
});
const getComments = require("./lib/getComments/middleware");
const renderTemplates = require("./lib/renderTemplates/middleware")

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/comments/:postName', [
    getComments(db),
    renderTemplates(templates)
]);

app.post('/comments/:postName', [
    getComments(db),
    postComment()
]);

app.listen(config.port, function () {
  console.log(`server running on port ${config.port}`);
}); 