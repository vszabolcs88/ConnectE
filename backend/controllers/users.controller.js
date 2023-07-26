const db = require("../database/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//Create a user account:
exports.createUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    post = {username: req.body.username, email: req.body.email, password: hashedPassword};
    let sql = "INSERT INTO users SET ?";
    let query = db.query(sql, post, (err, result) => {
      if(err) throw err;
      res.send(result);
    }) 
  } catch (error) {
    res.status(500).json({"error": error})
  }
}

//Login in the account:
exports.loginUser =  (req, res, next) => {
  let sql = "SELECT * FROM users WHERE email = ?";
  let query = db.query(sql, req.body.email, (err, result) => {
    if(err) throw err;
    if(result === null) {
      return res.status(401).send('Cannot find user')
    }

    //convert raw data packet object to JSON
    let data = JSON.parse(JSON.stringify(result));

    //check a password
    try {
      bcrypt.compare(req.body.password, data[0].password, function(err, valid) {
        if(valid == true) {
          console.log("user logged in");
          const token = jwt.sign(
            {id: data[0].id},
            process.env.TOKEN_SECRET,
            {expiresIn: '24h'});
            res.status(200).json({
              id: data[0].id,
              username: data[0].username,
              token: token
            });
        } else {
            console.log("Incorrect password!")
        }
      });
    } catch {
      res.status(500).send()
    }
  }) //end of querry
}