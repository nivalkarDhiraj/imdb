module.exports = (sequelize, Sequelize) => {
	const MovieCast = sequelize.define("movieCast", {
		role: {
			type: Sequelize.STRING,
			allowNull: false,
		}
	});

	// MovieCast.associate = (models) => {
	// 	MovieCast.belongsTo(models.Movie, {
	// 		foreignKey: "movie_id",
	// 	});
    //     MovieCast.belongsTo(models.Movie, {
	// 		foreignKey: "actor_id",
	// 	});
	// };

	return MovieCast;
};
