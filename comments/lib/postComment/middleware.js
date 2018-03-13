const commentModule = require("./commentModule");
module.exports = (templates) => {
    return (req, res) => {
        commentModule.addComment(req.json, req.body)
        .then((html) => {
            res.send(html)
        })
        .catch((err) => {
            return err;
        });
    }
}