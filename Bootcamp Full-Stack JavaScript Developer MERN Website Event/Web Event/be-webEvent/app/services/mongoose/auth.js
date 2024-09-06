const Users = require('../../api/v1/users/model');
// import custom error not found dan bad request
const { UnauthorizedError, BadRequestError } = require('../../errors');
const {createTokenUser, createJWT} = require('../../utils');

const signin = async (req) => {
    const { email, password } = req.body;
    if(!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const result = await Users.findOne({email});

    if(!result) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const checkPassword = await result.comparePassword(password);
    if(!checkPassword) {
        throw new UnauthorizedError('passwordmu salah');
    }

    const token = createJWT({payload: createTokenUser(result)});
    return token;
};

module.exports = {signin}