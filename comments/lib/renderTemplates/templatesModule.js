const ejs = require("ejs");
let helpers = {moment: require("moment")}

function render(json, templates) {
    helpers = {...helpers, ...{templates, getHtml}};
    return new Promise((resolve, reject) => {
        resolve(getHtml(JSON.parse(json), templates.container));
    })
}
function getHtml(data, template) {
    let result;
    ejs.renderFile(template, {...helpers, ...{data}}, null, (err, str) => {
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
