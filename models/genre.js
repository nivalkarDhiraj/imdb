module.exports = (sequelize, Sequelize) => {
	const Genre = sequelize.define("genre", {
		title: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	Genre.associate = (models) => {
		Genre.belongsToMany(models.Movie, {
			through: "movieGenre",
            as: "movies",
            foreignKey: "genre_id"
		});
	};
	return Genre;
};
