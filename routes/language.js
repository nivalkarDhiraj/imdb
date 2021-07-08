const express = require("express");
const router = express.Router();
const languageController = require("../controllers/language");
const isAdmin = require("../middlewares/isAdmin");
const checkAuth = require("../middlewares/checkAuth");

router.post("/", checkAuth, isAdmin, languageController.create); //create language
router.get("/", checkAuth, isAdmin, languageController.findAll); //get all languages
router.get("/movies", checkAuth, languageController.findAllMovies); //get all movies with given language
router.delete("/:name", checkAuth, isAdmin, languageController.delete); //delete language

module.exports = router;
