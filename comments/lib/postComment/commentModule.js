const Joi = require("joi");

function addNewPost (dbLocation, postName) {
    return new Promise((resolve, reject) => {
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database(dbLocation);
    
        const emptyComments = JSON.stringify({comments: []});
     
        db.run(`INSERT INTO comments(name, json) VALUES(?, ?)`, [postName, emptyComments], function(err) {
            if (err) {
                reject(console.log(err.message));
            }
            resolve({json: emptyComments});
        });
        db.close();
    })
}
function addComment(commentsJson, commentBody, commentTemplate) {
    return new Promise((resolve, reject) => {
        const comments = JSON.parse(commentsJson);
        const schema = require(commentTemplate);
        const result = Joi.attempt(commentBody, schema);
        resolve(result)
    })
}
module.exports = {
    addComment
};
