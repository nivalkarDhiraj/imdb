module.exports = (req, res, next) => {
	try {
		if (req.user.role === "admin") {
			next();
		} else{
            return res.status(401).json({ message: "You need admin rights to access this route" });
        }
	} catch (err) {
		return res.status(401).json({ message: "Something went wrong!" });
	}
};
