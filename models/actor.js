module.exports = (sequelize, Sequelize) => {
	const Actor = sequelize.define("actor", {
		fname: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		lname: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		gender: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				isIn: [["male", "female", "other"]],
			},
		},
		image_url: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	Actor.associate = (models) => {
		Actor.belongsToMany(models.Movie, {
			through: "movieCast",
			as: "movies",
			foreignKey: "act_id",
		});
	};

	return Actor;
};
