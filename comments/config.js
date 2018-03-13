module.exports = require("rc")("comments", {
    port: 4000,
    database: 'main.db',
    templates: {
        container: "container.ejs",
        comments: "comments.ejs",
        comment: "comment.js"
    },
    commentDefault: {
        avatar: "/assets/avatars/default/user.svg",
        name: "Guest",
    }
});