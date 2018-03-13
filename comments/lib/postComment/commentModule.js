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
function addComment(commentsJson, commentBody) {
    const comments = JSON.parse(commentsJson);
    
}
module.exports = {
    getComments
};
