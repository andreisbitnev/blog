const ejs = require("ejs");
let helpers = {moment: require("moment")}

function render(json, templates) {
    helpers = {...helpers, ...{templates, getHtml}};
    comments = JSON.parse(json).comments;
    return new Promise((resolve, reject) => {
        resolve(getHtml(comments, templates.container));
    })
}
function getHtml(comments, template) {
    let result;
    ejs.renderFile(template, {...helpers, ...{comments}}, null, (err, str) => {
        if (err) {
            return err;
        }
        result = str;
    });
    return result;
}

module.exports = {
    render
};
