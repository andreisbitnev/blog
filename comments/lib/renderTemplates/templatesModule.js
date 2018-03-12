const ejs = require("ejs");
let helpers = {moment: require("moment")}

function render(json, templates) {
    helpers = {...helpers, ...{json, templates, getHtml}}
    return getHtml(json, templates.container);
}
function getHtml(json, template) {
    let result;
    ejs.renderFile(template, helpers, null, (err, str) => {
        result = str;
    });
    return result;
}

module.exports = {
    render
};
