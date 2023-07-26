const db = require("../database/index");

//Get Profile:
exports.getProfile = (req, res, next) => {
    let userId = req.auth.userId;
    console.log(userId);
    let sql = `SELECT * FROM users WHERE id= ${userId}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        // console.log(result);
        res.send(result);
    })
}

//Delete account:
exports.deleteAccount = (req, res, next) => {
    let userId = req.auth.userId;
    let sql = `DELETE FROM users WHERE id=${userId}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log('Account deleted');
        // res.send(result);
    })
}