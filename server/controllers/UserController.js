const { User } = require('../models');
const { tokenGenerator } = require('../helpers/jsonwebtoken');
class UserController {
    static async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({ status: 200, data: users, message: 'success get data' });
        } catch (err) {
            res.status(500).json({ message: err.message, status: 500 });
        }
    }
    static async register(req, res) {
        try {
            const { name, username, preferred_timezone } = req.body;

            const newUser = await User.create({
                name,
                username,
                preferred_timezone,
            });
            res.status(201).json({ status: 201, data: newUser, message: 'success register' });
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const message = error.errors.map((err) => err.message);
                return res.status(400).json({ message, status: 400 });

            }
            res.status(500).json({ message: error.message, status: 500 });
        }
    }
    static async login(req, res) {
        try {
            const { username } = req.body;
            const usernameFound = await User.findOne({ where: { username } });
            if (!usernameFound) {
                return res.status(401).json({ message: ' username not found' });
            }
            const { id, name, preferred_timezone } = usernameFound
            const token = tokenGenerator({ id, name, username: usernameFound.username, preferred_timezone });
            res.status(200).json({ data: { token }, message: 'success login', status: 200 });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message, status: 500 });
        }
    }
    static async getListUserByPreferredTimezone(req, res) {
        try {
            const { preferred_timezone } = req.user;
            if (!preferred_timezone) return res.status(400).json({ message: 'preferred_timezone is required', status: 400 });
            const users = await User.findAll({
                where: { preferred_timezone }, attributes: ['id', 'username', 'preferred_timezone']
            });
            res.status(200).json({ status: 200, data: users, message: 'success get list user by preferred timezone', user: req.user.preferred_timezone });
        } catch (error) {
            res.status(500).json({ message: error.message, status: 500 });
        }
    }
}

module.exports = UserController