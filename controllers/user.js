const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.User;
const Movie = db.Movie;
const Rating = db.Rating;

// Create and Save a new User
exports.signUp = async (req, res) => {
	const { email, name, password, user_role } = req.body;

	//check if everything is passed in request
	if (!email || !name || !password || !user_role) {
		return res.status(400).send({
			message: "Content cannot be empty!",
		});
	}

	await User.findAll({ where: { email: email } }).then((user) => {
		if (user.length > 0) {
			return res.status(400).json({ message: "User already exist" });
		} else {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, (err, hash) => {
					if (err) throw err;
					// create a User
					const user = {
						email: email,
						name: name,
						password: hash,
						user_role: user_role,
					};
					User.create(user)
						.then((data) => {
							console.log(data);
							return res.status(200).json({ message: "User created succesfully" });
						})
						.catch((err) => {
							return res.status(500).json({
								message: err.message,
							});
						});
				});
			});
		}
	});
};

// add ratings
exports.addRating = (req, res) => {
	const { userID, movieID } = req.params;
	const { rating, comment } = req.body;

	rate = { rating: rating, comment: comment, user_id: userID, movie_id: movieID };

	if (userID && movieID && rating && comment) {
		User.findByPk(userID).then((user) => {
			if (!user) {
				console.log("User not found");
				return res.status(404).send(null);
			}
			Movie.findByPk(movieID).then((movie) => {
				if (!movie) {
					console.log("Movie not found");
					return res.status(404).send(null);
				}
				// actor.addMovie(movie);
				Rating.create(rate)
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

// User  login
exports.login = async (req, res) => {
	const { email, password } = req.body;

	//check if everything is passed in request
	if (!email || !password) {
		return res.status(400).send({
			message: "Enter username or password",
		});
	}
	await User.findAll({ where: { email: email } }).then((users) => {
		if (users.length == 0) {
			return res.status(400).json({ message: "User does not exist" });
		} else {
			const user = users[0];
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (!isMatch) {
					return res.status(400).json({ message: "Invalid email or password." });
				}
				jwt.sign({ id: user.id, role: user.user_role }, "jwtSecret", (err, token) => {
					if (err) {
						throw err;
					}
					console.log(`User ID: ${user.id}\nUser Role: ${user.user_role}`)
					return res.status(200).json({ token: token});
				});
			});
		}
	});
};
