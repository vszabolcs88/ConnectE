const express = require("express");
const router = express.Router();

const postController = require("../controllers/posts.controller");
const multer = require('../middleware/multer-config');
const auth = require("../middleware/auth");

router.get("/", auth, postController.getAll);
router.get("/:id",auth, postController.getPost);
router.post("/",auth, postController.createPost);
//router.put("/:id", postController.updatePost);
router.delete("/:id", auth, postController.deletePost)
module.exports = router;
