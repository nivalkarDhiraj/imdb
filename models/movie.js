module.exports = (sequelize, Sequelize) => {
	const Movie = sequelize.define("movie", {
		title: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		year: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		languageName: {
			type: Sequelize.STRING,
			allowNull: false,
			// references: "language",
			// referencesKey: "name"
		},
		release_date: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},
		poster_url: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	Movie.associate = (models) => {
		Movie.belongsTo(models.Language, {
			foreignKey: "languageName",
		});

		Movie.belongsToMany(models.Genre, {
			through: "movieGenre",
			as: "genres",
			foreignKey: "movie_id",
		});

		Movie.belongsToMany(models.Actor, {
			through: "movieCast",
			as: "cast",
			foreignKey: "movie_id",
		});

		Movie.belongsToMany(models.User, {
			through: "rating",
			as: "ratings",
			foreignKey: "movie_id",
		});
	};

	return Movie;
};
