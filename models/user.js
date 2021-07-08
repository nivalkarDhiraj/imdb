module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
            validate:{
                isEmail : true,
            }
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		user_role: {
			type: Sequelize.STRING,
			allowNull: false,
            isIn: [["admin","basic"]]
		},
	});

	User.associate = (models) => {
		User.belongsToMany(models.Movie, {
			through: "rating",
			as: "movies",
			foreignKey: "user_id",
		});
	};

	return User;
};
