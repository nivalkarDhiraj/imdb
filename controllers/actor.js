const db = require("../models");
const Actor = db.Actor;
const Movie = db.Movie;
const MovieCast = db.MovieCast;

// Create and Save a new Actor
exports.create = (req, res) => {
	const { fname, lname, gender, image_url } = req.body;

	//check if everything is passed in request
	if (!fname || !lname || !gender) {
		return res.status(400).send({
			message: "Content cannot be empty!",
		});
	}

	// create a actor
	const actor = {
		fname: fname,
		lname: lname,
		gender: gender,
		image_url: image_url,
	};

	Actor.create(actor)
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message,
			});
		});
};

// Add movie and role
exports.addMovie = (req, res) => {
	const { actorID, movieID } = req.params;
	const { role } = req.body;

	cast = { role: role, act_id: actorID, movie_id: movieID };

	if (cast) {
		Actor.findByPk(actorID).then((actor) => {
			if (!actor) {
				console.log("Actor not found");
				return res.status(404).send(null);
			}
			Movie.findByPk(movieID).then((movie) => {
				if (!movie) {
					console.log("Movie not found");
					return res.status(404).send(null);
				}
				// actor.addMovie(movie);
				MovieCast.create(cast)
					.then((data) => {
						return res.status(200).json(data);
					})
					.catch((err) => {
						return res.status(500).send({
							message: err.message,
						});
					});
			});
		});
	} else {
		return res.status(400).send({
			message: "Content cannot be empty!",
		});
	}
};

// Retrieve all Actor from the database.
let actorData;
const getActorData = async () => {
	await Actor.findAll()
		.then((data) => {
			console.log("ActorData is loaded");
			console.log("1", data);
			actorData = data;
			return data;
		})
		.catch((err) => {
			return null;
		});
	console.log("Actor data is loaded");
};

getActorData(); //EagerLoading

exports.findAll = (req, res) => {
	if (actorData) {
		return res.status(200).json(actorData);
	} else {
		Actor.findAll()
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((err) => {
				return res.status(500).send({
					message: err.message,
				});
			});
	}
};

// Find all movies of an Actor
exports.findAllMovies = (req, res) => {
	const { id } = req.params;

	//check if everything is passed in request
	if (!id) {
		return res.status(400).send({
			message: "Please pass the actor id",
		});
	}

	Actor.findByPk(id, { include: "movies" })
		.then((movies) => {
			return res.status(200).json(movies);
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message,
			});
		});
};

// Delete a Actor with the specified id in the request
exports.delete = (req, res) => {
	const { id } = req.params;

	Actor.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Actor was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Actor with id=${id}. Maybe Actor was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete Actor with id=" + id,
			});
		});
};
