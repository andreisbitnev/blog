module.exports = require("rc")("comments", {
    port: 4000,
    database: 'main.db',
    templates: {
        container: "comments.ejs",
        comment: "comment.ejs"
    }
});