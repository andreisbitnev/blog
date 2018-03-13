const templatesModule = require("./templatesModule");
module.exports = (templates) => {
    return (req, res) => {
        templatesModule.render(req.json, templates, templates.container)
        .then((html) => {
            res.send(html)
        })
        .catch((err) => {
            return err;
        });
    }
}