const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actor");
const isAdmin = require("../middlewares/isAdmin");
const checkAuth = require("../middlewares/checkAuth");

router.post("/", checkAuth, isAdmin, actorController.create); // add actor
router.post("/:actorID/:movieID", checkAuth, isAdmin, actorController.addMovie); //add movie to actor
router.get("/", actorController.findAll); // get all actors
router.get("/:id", actorController.findAllMovies); // get all movies for an Actor
router.delete("/:id", checkAuth, isAdmin, actorController.delete); //delete actor

module.exports = router;