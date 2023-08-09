const db = require("../database/index");
const bcrypt = require("bcrypt");
const fs = require("fs");

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
    let password = req.body.password;
    // console.log(req.body.password);
    let sql = `SELECT password FROM users WHERE id=${userId}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        // console.log(result[0].password)
        try {
           //Check password with bcrypt
           bcrypt.compare(password, result[0].password, function(err, valid) {
            if(valid == true) {
                // console.log('user valid')
                //Select all image URL:
                let sqlImages = `SELECT imgUrl FROM posts WHERE userId=${userId}`;
                let queryImages = db.query(sqlImages, (err,resultImages) => {
                    if(err) throw err;
                    //console.log(resultImages);

                    //Delete images from file system:
                    for (let url of resultImages) {
                        if(url.imgUrl !== null) {
                            //console.log('this is the url: ' + url.imgUrl);
                            let imageFile = url.imgUrl.split('images/')[1];
                            //console.log(imageFile);
                            fs.unlink('images/' + imageFile, (err) => {
                                if (err) throw err;
                                console.log(`${imageFile} was deleted`);
                            });
                        }
                    }
                });

                //Delete user from read_table:
                let sqlRead = `DELETE FROM read_table WHERE read_userId= ${userId}`;
                let queryRead = db.query(sqlRead, (err, resultRead) => {
                    if(err) throw err;
                    console.log('user was deleted from read_table');
                });

                 //Delete user from post table:
                 let sqlPost = `DELETE FROM posts WHERE userId= ${userId}`;
                 let queryPost = db.query(sqlPost, (err, resultPost) => {
                     if(err) throw err;
                     console.log('user was deleted from posts');
                 });

                //Delete user from user table:
                let sqlUser = `DELETE FROM users WHERE id= ${userId}`;
                let queryUser = db.query(sqlUser, (err, resultUser) => {
                    if(err) throw err;
                    console.log('user was deleted from users');
                });
            } else {
                //console.log('user invalid');
                res.status(400).json({ error: 'Invalid request' });
            } 
           }) 
        } catch {
            res.status(500).send()
        }
        // res.send(result);
    })
}