const db = require("../database/index");
const fs = require("fs");

//Select all posts:
exports.getAll = (req, res, next) => {
  console.log(req.body);
    let userId = req.auth.userId;
    let sql = 
    // `SELECT posts.id, posts.title, posts.body, posts.imgUrl, posts.userId, posts.date_published, users.username 
    // FROM posts 
    // INNER JOIN users 
    // ON posts.userId=users.id;`
    `
    SELECT posts.* , users.*, read_table.read_userId, 
    IF(posts.userId = ? OR read_table.read_userId= ?, TRUE , FALSE ) AS p_readby_user FROM posts 
    LEFT JOIN (SELECT * FROM read_table WHERE read_table.read_userId = ?) read_table ON posts.post_id= read_table.read_postId
    INNER JOIN users ON users.id =  posts.userId
    ORDER BY posts.date_published DESC;
    `
    let query = db.query(sql,[userId,userId,userId],(err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
}

//Select a post:
exports.getPost = (req, res, next) => {
    let userId = req.auth.userId;
    let postId = req.params.id;
    console.log(userId);
    console.log(postId);
    let sql = `SELECT * FROM posts WHERE post_id= ${req.params.id}`;
    let query = db.query(sql,(err, result) => {
    if(err) throw err;
    console.log(result);
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
    //console.log(result[0].imgUrl);
    res.send(result);
  })
}

//Create a post:
exports.createPost = (req, res, next) => {
    let incomingData;
    let pTitle;
    let pText;
    let pImage;
    let url;
    let userId;

    if(req.file) {
      incomingData = JSON.parse(req.body.otherFields);
      userId = req.auth.userId;
      pTitle = incomingData.title;
      pText = incomingData.body;
      url = req.protocol + "://" + req.get("host") + "/images/";
      pImage = url + req.file.filename;
      let post = {title: pTitle, body: pText, imgUrl: pImage, userId: userId};
      let sql = "INSERT INTO posts SET ?";
      let query = db.query(sql, post, (err, result) => {
          if(err) throw err;
          //res.send(result);
          res.status(200).json({ message: 'Post created by user' });
        })
    } else {
      incomingData = JSON.parse(req.body.otherFields);
      pTitle = incomingData.title;
      pText = incomingData.body;
      userId = req.auth.userId;
      pImage = null;
      let post = {title: pTitle, body: pText, imgUrl: pImage, userId: userId};
      let sql = "INSERT INTO posts SET ?";
      let query = db.query(sql, post, (err, result) => {
          if(err) throw err;
          //res.send(result);
          res.status(200).json({ message: 'Post created by user' });
        })
    }
}

//Delete a post:
exports.deletePost = (req,res, next) => {
  let userId = req.auth.userId;
  //console.log(userId);
  //select the user who created the post
  let postUserId = `SELECT userId FROM posts WHERE post_id= ${req.params.id}`
  let query = db.query(postUserId, (err, result) => {
    if(err) throw err;
    //convert raw data packet object to JSON
    let postUserIdString = JSON.parse(JSON.stringify(result));
    let postUserId = parseInt(postUserIdString[0].userId);

    if(userId === postUserId) {
      //Getting image url and deleting post
      let sql = `SELECT imgUrl FROM posts WHERE post_id=${req.params.id}`
      let query = db.query(sql,(err, result) => {
        if(err) throw err;

        let imgUrl = result[0].imgUrl;
        //console.log(imgUrl);

        //Post without image to delete:
        if(imgUrl == null) {
          let sql2 = `DELETE FROM posts WHERE post_id= ${req.params.id}`;
          let query2 = db.query(sql2,(err, result2) => {
          if(err) throw err;
          res.status(200).json({ message: 'Post deleted by user' });
          })
        } else {
          //Post with image to delete:
          let imageFile = imgUrl.split('images/')[1];
          //console.log(result[0].imgUrl.split('images/')[1]);
          fs.unlink('images/' + imageFile, (err) => {
            if (err) throw err;
            console.log(`${imageFile} was deleted`);
          }); 
            let sql3 = `DELETE FROM posts WHERE post_id= ${req.params.id}`;
            let query3 = db.query(sql3,(err, result3) => {
            if(err) throw err;
            res.status(200).json({ message: 'Post deleted by user' });
            })
          }
          //Delete post from read table:
          let sqlDelete = `DELETE FROM read_table WHERE read_postId= ${req.params.id}`;
          let queryDelete = db.query(sqlDelete,(err, result3) => {
            if(err) throw err;
            })
        })
    } else {
      //console.log('Invalid request!');
      res.status(400).json({ error: 'Invalid request' });
    }
  })
}
