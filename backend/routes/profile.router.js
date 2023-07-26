const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profile.controller");
const deleteAccountController = require("../controllers/profile.controller");
const auth = require("../middleware/auth");

router.get("/", auth, profileController.getProfile);
router.delete("/", auth, deleteAccountController.deleteAccount);
module.exports = router;