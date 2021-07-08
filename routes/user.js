const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const isAdmin = require("../middlewares/isAdmin");
const checkAuth = require("../middlewares/checkAuth");

router.post("/signup", userController.signUp); //user signUp
router.post("/login", userController.login); //user login
router.post("/rate/:userID/:movieID", checkAuth, userController.addRating); //give rating

module.exports = router;
