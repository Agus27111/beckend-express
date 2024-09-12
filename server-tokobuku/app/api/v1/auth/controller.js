const {User} = require('../../db/models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email:email}})
        if(!user) throw new Error ('User not found')

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) throw new Error ('Wrong password')

            const token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })

            res.status(200).json({
                message: 'Signin success',
                token
            })
    } catch (error) {
        next(error)
    }
}

const signup = async (req, res, next) => {
    try {
        const {name, email, password, role} = req.body

        const existEmail = await User.findOne({where: {email:email}})
        if(existEmail) throw new Error ('Email already exist')

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        })
        res.status(201).json({
            message: 'Signup success',
            data: user
        })
        
    } catch (error) {
        next(error)
    }
}

const getAll = async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

module.exports = {signin, signup, getAll}