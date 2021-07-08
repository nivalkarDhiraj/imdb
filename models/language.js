module.exports = (sequelize, Sequelize) => {
	const Language = sequelize.define("language", {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
            primaryKey: true
		},
	});

	Language.associate = (models) => {
		Language.hasMany(models.Movie, { as: "movies"})
	}
	return Language;
};
