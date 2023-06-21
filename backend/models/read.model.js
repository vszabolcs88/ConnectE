const db = require("../database/index");

//create a read table for posts
exports.createReadTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS read_table(read_id int AUTO_INCREMENT, read_userId INT NOT NULL, read_postId INT NOT NULL,  PRIMARY KEY(read_id))";
    return new Promise ((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};