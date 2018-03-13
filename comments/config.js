module.exports = require("rc")("comments", {
    port: 4000,
    database: 'main.db',
    templates: {
        container: "container.ejs",
        comments: "comments.ejs"
    }
});