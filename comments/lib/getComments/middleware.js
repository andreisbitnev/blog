const commentsModule = require("./commentsModule");
module.exports = (db) => {
    return (req, res, next) => {
        const postName = req.params.postName;
        commentsModule.getComments(db, postName)
        .then((result) => {
            req.json = result.json;
        })
        .catch((err) => {
            return error;
        });
    }
}