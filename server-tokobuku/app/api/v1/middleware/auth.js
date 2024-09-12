const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        const isTokenTrue = req.headers.authorization;

        if(!isTokenTrue) throw new Error ('Token not found')

        const token = isTokenTrue.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        next(error)
    }
}