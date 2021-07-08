const express = require('express');
const router = express.Router();
const genreController = require("../controllers/genre");

router.post("/", genreController.create);
router.get("/", genreController.findAll);
router.delete("/:name", genreController.delete);

module.exports = router;