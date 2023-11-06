const express = require("express");
const router = express.Router();
const password = require('../middleware/password');
const usersController = require("../controllers/users.controller");

router.post("/",password, usersController.createUser);
router.post("/login", usersController.loginUser);

module.exports = router;