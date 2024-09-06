const {UnauthorizedError, UnauthenticatedError} = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
    }

    if(!token) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    
    const payload = isTokenValid({token});

    req.user = {
        id: payload.userId,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        organizer: payload.organizer
    }

    next();
} catch (err) {
    next(err)
}

};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
    }
}

module.exports = {authenticateUser, authorizeRoles}