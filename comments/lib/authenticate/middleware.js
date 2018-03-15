const authModule = require("./authModule");
module.exports = (db) => {
    return (req, res, next) => {
        authModule.authenticate(db, postName)
        .then((result) => {
            req.json = result.json;
            next();
        })
        .catch((err) => {
            return error;
        });
    }
}