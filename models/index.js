const Sequelize = require("sequelize");
const config = require("../config/db.config");
const db = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
	define: {
		freezeTableName: true,
	},
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Movie = require("./movie.js")(sequelize, Sequelize);
db.Language = require("./language.js")(sequelize, Sequelize);
db.Genre = require("./genre.js")(sequelize, Sequelize);
db.Actor = require("./actor.js")(sequelize, Sequelize);
db.MovieCast = require("./movieCast.js")(sequelize, Sequelize);
db.User = require("./user.js")(sequelize, Sequelize);
db.Rating = require("./rating.js")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

// db.Language.hasMany(db.Movie, { as: "movies" });
// db.Movie.belongsTo(db.Language,{ foreignKey: "languageName"});

module.exports = db;
