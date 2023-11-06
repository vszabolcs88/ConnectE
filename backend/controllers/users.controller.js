const db = require("../database/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//Create a user account:
exports.createUser = async (req, res, next) => {
  console.log(req.body.username);
  let email = req.body.email;
  let newuser = req.body.username;

  try {
    // Check if email or username already exists
    let emailExistSql = `SELECT * FROM users WHERE email = ? OR username = ?`;
    db.query(emailExistSql, [email, newuser], (err, existEmail) => {
      if (err) throw err;
      if (existEmail.length > 0) {
        console.log("User already exists");
        res.status(409).json({ error: "User and email already exists" });
      } else {
        // Hash the password and insert the user
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
            if (err) throw err;
            const post = {
              username: req.body.username,
              email: req.body.email,
              password: hashedPassword
            };
            let sql = "INSERT INTO users SET ?";
            db.query(sql, post, (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ "error": "Internal server error" });
              } else {
                console.log("User registered successfully");
                res.status(201).json({ "message": "User registered successfully" });
              }
            });
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
};

//Login in the account:
exports.loginUser =  (req, res, next) => {
  let sql = "SELECT * FROM users WHERE email = ?";
  let query = db.query(sql, req.body.email, (err, result) => {
    if(err) throw err;
    
    if(result.length === 0) {
      console.log('Wrong email address!')
      return res.status(401).json({error: 'Wrong email address!'});
    }

    // convert raw data packet object to JSON
    let data = JSON.parse(JSON.stringify(result));

    // check a password
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
            return res.status(401).json({error: 'Incorrect password'});
        }
      });
    } catch {
      res.status(500).send()
    }
  }) //end of querry
}