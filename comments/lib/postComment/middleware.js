const commentsModule = require("./commentsModule");
module.exports = (db) => {
    return (req, res, next) => {
        const postName = req.params.postName;
        const commentsData = req.json;
        commentsModule.updateComments(db, postName, commentsData)
        .then(() => {
            res.status(200).json({ok: true})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error: "Internal server error"});
        });
    }
}