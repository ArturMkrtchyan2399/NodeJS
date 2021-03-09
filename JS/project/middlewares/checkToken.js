const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        let token;
        if (authorization && authorization.startsWith('Bearer')) {
            token = authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(403).json({
                message: "Token was not provided"
            })
        }

        const decoded = await jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        return next();

    } catch (err) {
        return res.status(500).json({
            message: "Invalid token"
        })
    }
};