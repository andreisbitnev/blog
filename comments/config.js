module.exports = require("rc")("comments", {
    port: 5000,
    templates: {
        comments: "comments.ejs",
        comment: "comment.ejs"
    }
});