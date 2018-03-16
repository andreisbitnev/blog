const templatesModule = require("./templatesModule");
module.exports = (templates) => {
    return (req, res) => {
        const user = req.user && req.user.display_name || null;
        templatesModule.render(req.json, templates, user)
        .then((html) => {
            res.send(html)
        })
        .catch((err) => {
            console.log(err.msg);
        });
    }
}