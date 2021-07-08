module.exports = (sequelize, Sequelize) => {
	const Rating = sequelize.define("rating", {
		rating: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				max: 10,
				min: 1,
			},
		},
		comment: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});

    Rating.associate = (models) => {
		Rating.belongsTo(models.Movie, {
			foreignKey: "movie_id",
		});
	};

	return Rating;
};
