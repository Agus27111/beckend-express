const UserModel = require('./model');
const { encrypt, compare } = require('../../middleware/bcrypt');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken, parseJwt, verifyAccessToken } = require('../../middleware/jwt');
const joiValidation = require('../../middleware/joi')


const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { error } = joiValidation.signinValidation.validate({
            email,
            password,
        });
        
        if (error) {
            error.isJoi = true; 
            return next(error); 
        }

        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            const err = new Error('User not found');
            err.statusCode = 404; 
            return next(err); 
        }

        const isMatch = compare(password, user.password);
        if (!isMatch) {
            const err = new Error('Password not match');
            err.statusCode = 401; 
            return next(err); 
        }

        const accessToken = generateAccessToken({
            id: user.id,
            role: user.role,
            email: user.email,
        });

        const refreshToken = generateRefreshToken({
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email,
        });

        res.status(200).json({
            message: 'Signin successful',
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error('Error during signin:', error); // Tambahkan log error
        next(error);
    }
};


    const signup = async (req, res, next) => {
        try {
            const { name, email, password, role } = req.body;
            
            const { error } = joiValidation.signupValidation.validate({
                name,
                email,
                password,
                role,
             });
              if (error) {
                error.isJoi = true; // Tandai error sebagai Joi error
                return next(error); // Forward error ke middleware
              }
        

            const hash = encrypt(password);
            const user = await UserModel.create({
                name,
                email,
                password: hash,
                role
            });

            res.status(201).json({
                message: 'Signup successful',
                data: user
            });
        } catch (error) {
           next(error) 
        }
    }


module.exports = {signin, signup}