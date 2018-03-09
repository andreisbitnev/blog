module.exports = require("rc")("comments", {
    port: 4000,
    templates: {
        comments: "comments.ejs",
        comment: "comment.ejs"
    }
});