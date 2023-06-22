const db = require("../database/index")

//Select all posts:
exports.getAll = (req, res, next) => {
    let sql = 
    `SELECT posts.id, posts.title, posts.body, posts.imgUrl, posts.userId, posts.date_published, users.username 
    FROM posts 
    INNER JOIN users 
    ON posts.userId=users.id;`
    let query = db.query(sql,(err, result) => {
    if(err) throw err;
    res.send(result);
  })
}

//Select a post:
exports.getPost = (req, res, next) => {
    let userId = req.auth.userId;
    let postId = req.params.id;
    let sql = `SELECT * FROM posts WHERE id= ${req.params.id}`;
    let query = db.query(sql,(err, result) => {
    if(err) throw err;
    let sql3 = `SELECT * FROM read_table WHERE read_userId= ${userId} AND read_postId = ${postId}`
    let query3 = db.query(sql3,(err, result3) => {
      if(err) throw err;
      if(result3.length == 0) {
        let sql2 = `INSERT INTO read_table(read_userId, read_postId) VALUES (?,?);`
        //req.param.id and userId
        let query2 = db.query(sql2,[userId,postId],(err, result2) => {
        if(err) throw err;
        })
      }
    })
    res.send(result);
  })
}

//Create a post:
exports.createPost = (req, res, next) => {
    res.json({file: req.file, body: req.body});
    console.log(req.file);
    // let incomingData = req.body
    // console.log(incomingData);
    
    //physical path to image directory
    //req.file.filename
  
    //post = {title: req.body.otherFields.title, body: req.body.otherFields.body, imgUrl: req.body.imgFile.name, userId: req.auth.userId,}; 
  //   let sql ="INSERT INTO posts SET ?";
  //   let query = db.query(sql, post, (err, result) => {
  //   if(err) throw err;
  //   res.send(result);
  // })
}

//Delete a post:
exports.deletePost = (req,res, next) => {
  //user id
  let userId = req.auth.userId;
  console.log(userId);
  //select the user who created the post
  let postUserId = `SELECT userId FROM posts WHERE id= ${req.params.id}`
  let query = db.query(postUserId, (err, result) => {
    if(err) throw err;
    //convert raw data packet object to JSON
    let postUserIdString = JSON.parse(JSON.stringify(result));
    let postUserId = parseInt(postUserIdString[0].userId);

    if(userId == postUserId) {
      let sql = `DELETE FROM posts WHERE id= ${req.params.id}`;
      let query = db.query(sql,(err, result) => {
      if(err) throw err;
      res.send("post deleted");
    })
    } else {
      console.log('Invalid request!')
    }
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

