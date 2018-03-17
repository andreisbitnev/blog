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
    },
    secrets: [
        'K438FHRUi(md@odsn59d94h6',
        '8ca)p#7Mnf&80fNfBho39sut'
    ],
    errorLogs: 'errors.log',
    domain: 'localhost'
});