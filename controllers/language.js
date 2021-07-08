const db = require("../models");
const Language = db.Language;

// Create and Save a new Language
exports.create = (req, res) => {
	const { name } = req.body;

	//check if everything is passed in request
	if (!name) {
		return res.status(400).send({
			message: "Content cannot be empty!",
		});
	}

	// create a movie
	const language = {
		name: name,
	};

	Language.create(language)
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message,
			});
		});
};

// Retrieve all Languages from the database.
exports.findAll = (req, res) => {
	Language.findAll()
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message,
			});
		});
};

exports.findAllMovies = (req, res) => {
	const { name } = req.body;

	//check if everything is passed in request
	if (!name) {
		return res.status(400).send({
			message: "Content cannot be empty!",
		});
	}

	Language.findByPk(name, {include: "movies"})
		.then((movies) => {
			return res.status(200).json(movies);
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message,
			});
		});
};

// Delete a Language with the specified id in the request
exports.delete = (req, res) => {
	const { name } = req.params;

	Language.destroy({
		where: { name: name },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Language was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Movie with name=${name}. Maybe Language was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete Language with name=" + name,
			});
		});
};
