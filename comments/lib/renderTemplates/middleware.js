const templatesModule = require("./templatesModule");
module.exports = (templates) => {
    return (req, res, next) => {
        templatesModule.render(req.json, templates, templates.container)
        .then((html) => {
            next(html);
        })
        .catch((err) => {
            return error;
        });
    }
}