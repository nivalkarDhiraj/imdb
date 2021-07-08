const db = require("../models");
const Movie = db.Movie;
const Rating = db.Rating;
const MovieCast = db.MovieCast;
const Op = db.Sequelize.Op;

// Create and Save a new Movie
exports.create = (req, res) => {
	const { title, year, languageName, release_date, poster_url } = req.body;

	//check if everything is passed in request
	if (!title || !year || !languageName || !release_date || !poster_url) {
		return res.status(400).send({
			message: "Content cannot be empty!",
		});
	}

	// create a movie
	const movie = {
		title: title,
		year: year,
		languageName: languageName,
		release_date: release_date,
		poster_url: poster_url,
	};

	Movie.create(movie)
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message,
			});
		});
};

const getPagination = (page, size) => {
	const limit = size ? +size : 3;
	const offset = page ? (page - 1) * limit : 0; //minus 1 to start from 1
	return { limit, offset };
};

const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: movies } = data;
	const currentPage = page ? parseInt(page) : 1;
	const totalPages = Math.ceil(totalItems / limit);

	return { totalItems, movies, currentPage, totalPages };
};

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
	const { page, size, title } = req.query;

	// if title is present search with the title and respond
	if (title) {
		var condition = {
			title: {
				[Op.iLike]: `%${title}%`,
			},
		};
		Movie.findAll({ where: condition })
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((err) => {
				return res.status(500).send({
					message: err.message,
				});
			});
	}

	const { limit, offset } = getPagination(page, size);

	Movie.findAndCountAll({ limit: limit, offset: offset })
		.then((data) => {
			const response = getPagingData(data, page, limit);
			res.status(200).json(response);
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message,
			});
		});
};

// Find a single Movie with an id
exports.findOne = async (req, res) => {
	const { id } = req.params;

	Movie.findByPk(id, {
		include: "cast",
	})
		.then(async (data) => {
			if (data) {
				await Rating.findAll({
					where: { movie_id: id },
					attributes: [[db.Sequelize.fn("avg", db.Sequelize.col("rating")), "rating"]],
				})
					.then((rating) => {
						data.dataValues.rating = rating[0].rating;
					})
					.catch((err) => {
						return res.status(500).send({
							message: err.message,
						});
					});
				console.log("res");
				return res.status(200).json(data);
			}
			res.status(404).send({
				message: "Movie not found",
			});
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message,
			});
		});
};

exports.getRating = (req, res) => {
	const { id } = req.params;
	Rating.findAll({
		where: { movie_id: id },
		// include: {
		// 	// model: Rating,
		// 	// as: "ratings",
		attributes: [[db.Sequelize.fn("avg", db.Sequelize.col("rating")), "rating"]],
		// },
	})
		.then((data) => {
			if (data) return res.status(200).json(data[0]);
			res.status(404).send({
				message: "Movie not found",
			});
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message,
			});
		});
};

// Update a Movie by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;
	const { title, year, languageName, release_date, poster_url } = req.body;

	//check if everything is passed in request
	if (!title || !year || !languageName || !release_date || !poster_url) {
		return res.status(400).send({
			message: "Content cannot be empty!",
		});
	}

	// create a movie
	const movie = {
		title: title,
		year: year,
		languageName: languageName,
		release_date: release_date,
		poster_url: poster_url,
	};

	Movie.update(movie, { where: { id: id } })
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Movie was updated successfully!",
				});
			} else {
				res.send({
					message: `Cannot update Movie with id=${id}. Maybe Movie was not found!`,
				});
			}
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message,
			});
		});
};

// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
	const { id } = req.params;

	Movie.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Movie was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete Movie with id=" + id,
			});
		});
};

exports.findTest = (req, res) => {
	const { id } = req.params;

	MovieCast.findAll()
		.then((data) => {
			if (data) return res.status(200).json(data);
			res.status(404).send({
				message: "Movie not found",
			});
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message,
			});
		});
};
