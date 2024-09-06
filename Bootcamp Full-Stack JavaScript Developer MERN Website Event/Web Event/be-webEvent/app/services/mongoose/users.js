const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model');
const {BadRequestError} = require('../../errors')

const createOrganizer = async(req)=> {
    const {organizer, email, password, role, confirmPassword, name} = req.body;

    if(password !== confirmPassword) {
        throw new BadRequestError('Password tidak cocok');
    }
    const result = await Organizers.create({organizer});

    const users = await Users.create({name, email, password, organizer: result._id, role});
    delete users._doc.password;

    return users;
}

const createUser = async (req, res) => {
    const {name, email, password, role, confirmPassword} = req.body;

    if(password !== confirmPassword) {
        throw new BadRequestError('Password tidak cocok');
    }

    const result = await Users.create({name, email, password, role, organizer: req.user.organizer});
    
    return result;
}

module.exports = {createOrganizer, createUser}