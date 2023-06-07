const db = require("../database/index")

//Select all posts:
exports.getAll = (req, res, next) => {
    let sql = "SELECT * FROM posts";
    let query = db.query(sql,(err, result) => {
    if(err) throw err;
    res.send(result);
  })
}

//Select a post:
exports.getPost = (req, res, next) => {
    let sql = `SELECT * FROM posts WHERE id= ${req.params.id}`;
    let query = db.query(sql,(err, result) => {
    if(err) throw err;
    res.send(result);
  })
}

//Create a post:
exports.createPost = (req, res, next) => {
    let incomingData = req.body
    console.log(incomingData);
    
    //physical path to image directory
    //req.file.filename
  
    post = {title: req.body.title, body: req.body.body, imgUrl: req.body.imgFile, userId: req.auth.userId}; 
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    res.send(result);
  })
}

//Delete a post:
exports.deletePost = (req,res, next) => {
  let sql = `DELETE  FROM posts WHERE id= ${req.params.id}`;
  let query = db.query(sql,(err, result) => {
  if(err) throw err;
  res.send("post deleted");
})
}

//Update a post:
// exports.updatePost = (req, res, next) => {
//     let newTitle = "updated title"
//     let sql = `UPDATE posts SET title = '${newTitle}' WHERE id= ${req.params.id}`;
//     let query = db.query(sql,(err, result) => {
//     if(err) throw err;
//     res.send("post updated");
//   })
// }

