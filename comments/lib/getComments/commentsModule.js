function getComments (dbLocation, postName) {
    return new Promise((resolve, reject) => {
        const sqlite3 = require('sqlite3').verbose();
 
        // open the database
        let db = new sqlite3.Database(dbLocation);
         
        let sql = `SELECT json FROM comments WHERE name = ?`;
         
        db.all(sql, [postName], (err, rows) => {
          if (err) {
            reject(err);
          }
          if (!rows || rows.length === 0) {
            resolve(addNewPost(dbLocation, postName));
          }
          resolve(rows[0]);
        });
    
        db.close();
    });
}
function addNewPost (dbLocation, postName) {
    return new Promise((resolve, reject) => {
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database(dbLocation);
    
        const emptyComments = JSON.stringify({timestamp: new Date().getTime(), name: postName,comments: []});
     
        db.run(`INSERT INTO comments(name, json) VALUES(?, ?)`, [postName, emptyComments], function(err) {
            if (err) {
                reject(console.log(err.message));
            }
            resolve({json: emptyComments});
        });
        db.close();
    })
}
module.exports = {
    getComments
};
