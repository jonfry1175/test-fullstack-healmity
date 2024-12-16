const { Appointment, User } = require("../models");

class AppointmentController {
    static async getAll(req, res) {
        try {
            const appointments = await Appointment.findAll({
                include: [User]
            });
            res.status(200).json({ status: 200, data: appointments, message: 'success get data' });
        } catch (err) {
            res.status(500).json({ message: err.message, status: 500 });
        }
    }
    static async create(req, res) {
        try {
            const { title, creator_id, start, end } = req.body;
            const newAppointment = await Appointment.create({ title, creator_id, start, end });
            res.status(201).json({ status: 201, data: newAppointment, message: 'success create data' });
        } catch (err) {
            res.status(500).json({ message: err.message, status: 500 });
        }
    }
}

module.exports = AppointmentController