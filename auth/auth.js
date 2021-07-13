const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.send({ message: "Send Auth token in headers", error: "Auth Token not found" });
        };
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.send({ message: "Auth token not found" });
        }
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.send({ message: "Invalid Auth token", error: "Unauthorised entry" })
        }
        req.user = decoded;
        console.log("Authenticated!")
        next();
    } catch (error) {
        console.log("Auth token not found", error);
        res.status(500).send({ message: "Unauthorised entry", error: error.message });
    }

}

module.exports = auth;