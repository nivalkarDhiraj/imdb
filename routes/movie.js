const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movie");
const isAdmin = require("../middlewares/isAdmin");
const checkAuth = require("../middlewares/checkAuth");

// router.get("/test", movieController.findTest);
router.get("/:id/rating", movieController.getRating); //get rating for given movie id
router.post("/",checkAuth, isAdmin, movieController.create); //create movie
router.get("/:id", movieController.findOne); //get movie with cast and rating
router.get("/", checkAuth, movieController.findAll); //get all movies
router.put("/:id",checkAuth, isAdmin,  movieController.update); //update movie
router.delete("/:id", checkAuth, isAdmin, movieController.delete); //delete movie



module.exports = router;