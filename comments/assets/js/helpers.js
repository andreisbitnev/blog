const ejs = require("ejs");
const path = require("path");
const config = require("../../config");
const moment = require("moment");

function render(comments, template) {
    const helpers = {
        moment,
        render
    }
    const commentTemplate = path.join(__dirname, '/../templates/',config.templates.comment);
    let result;
    ejs.renderFile(template, { helpers, comments, commentTemplate}, null, (err, str) => {
        result = str;
    });
    return result;
}

module.exports = {
    render
}