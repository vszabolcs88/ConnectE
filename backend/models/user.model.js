const db = require("../database/index");

//create a user table
exports.createUserTable= (req, res) =>{
    //cheking if table exist
    let sql = "CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))";
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
        if(err) reject(err);
        resolve(result);
        });
    });
};
exports.createUser = (req, res) =>{
}
exports.findOneUser = (req, res) =>{

}