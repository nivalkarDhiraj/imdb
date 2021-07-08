const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	try {
		const token = authorization.replace("Bearer ", "");
		const decoded = jwt.verify(token, "jwtSecret");
		console.log(decoded);
        req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Authentication failed" });
	}
};
