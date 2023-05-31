const db = require("../database/index");

//create a post table
exports.createPostTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), imgUrl VARCHAR(255), userId VARCHAR(255), PRIMARY KEY(id))";
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) =>{
            if(err) reject(err);
            resolve(result);
        });
    });
};
