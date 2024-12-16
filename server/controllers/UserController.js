const { User } = require('../models');
const { tokenGenerator } = require('../helpers/jsonwebtoken');
class UserController {
    static async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    static async register(req, res) {
        try {
            const { name, username, preferred_timezone } = req.body;
            // unique username
            const existsUsername = await User.findOne({ where: { username } });
            if (existsUsername) {
                return res.status(400).json({ message: 'Name already exists' });
            }
            const newUser = await User.create({
                name,
                username,
                preferred_timezone,
            });
            res.status(201).json(newUser);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errors = error.errors.map((err) => err.message);
                return res.status(400).json({ errors });

            }
            res.status(500).json(error.message);
        }
    }
    static async login(req, res) {
        try {
            const { userName } = req.body;
            const userNameFound = await User.findOne({ where: { userName } });
            if (!userNameFound) {
                return res.status(401).json({ message: ' Invalid userName' });
            }
            const token = tokenGenerator({ id: emailFound.id, email: emailFound.email, role_id: emailFound.role_id });

            res.status(200).json(token);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = UserController