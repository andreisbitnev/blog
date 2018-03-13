const commentModule = require("./commentModule");
module.exports = (templates) => {
    return (req, res) => {
        commentModule.addComment(req.json, req.body, templates.comment)
        .then((html) => {
            res.send(html)
        })
        .catch((err) => {
            return err.message;
        });
    }
}