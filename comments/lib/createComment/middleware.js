const commentModule = require("./commentModule");
module.exports = (templates) => {
    return (req, res, next) => {
        commentModule.createComment(req.json, req.body, templates.comment)
        .then((updatedJson) => {
            req.json = updatedJson;
            next();
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
}