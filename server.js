const express = require("express");
const cors = require("cors");
const db = require("./models");
require("dotenv").config();
const app = express(); 
const port = process.env.PORT || 3000;

const movieRouter = require("./routes/movie");
const languageRouter = require("./routes/language");
const actorRouter = require("./routes/actor");
const userRouter = require("./routes/user");

const checkAuth = require("./middlewares/checkAuth");
// var corsOptions = {
//     origin: "website"  //add frontend url
// }

app.use(cors());
app.use(express.json());
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and re-sync db.");
// });
// app.use(checkAuth);
// console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.JWT_SECRET);	
// console.log(process.env.DB_USER);

app.use("/movie",checkAuth, movieRouter);
app.use("/language", languageRouter);
app.use("/actor", actorRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
	res, json({ message: "Welcome!" });
});

app.listen(port, () => {
	console.log("listening on port ", port);
});
