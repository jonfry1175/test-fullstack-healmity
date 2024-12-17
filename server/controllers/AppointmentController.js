const { Appointment, User, UserAppoinment } = require("../models");

class AppointmentController {
    static async getAll(req, res) {
        try {
            const appointments = await Appointment.findAll({
                include: [User]
            });
            // Format data
            const data = appointments.map((appointment) => {
                const createdBy = appointment.User ? appointment.User.username : null;
                return { ...appointment.dataValues, createdBy };
            });
            res.status(200).json({ status: 200, data, message: 'success get data' });
        } catch (err) {
            res.status(500).json({ message: err.message, status: 500 });
        }
    }
    static async create(req, res) {
        try {
            const { id } = req.user
            const { title, start, end, with_user_id } = req.body;
            const newAppointment = await Appointment.create({ title, start, end, with_user_id, creator_id: id });
            await UserAppoinment.create({ user_id: id, appointment_id: newAppointment.id });

            res.status(201).json({ status: 201, message: 'success create data' });
        } catch (err) {
            res.status(500).json({ message: err.message, status: 500 });
        }
    }

    static async getListUserAppoinment(req, res) {
        try {
            const { id } = req.user
            const userAppoinments = await UserAppoinment.findAll({ where: { user_id: id }, include: [Appointment, User] });

            const formattedData = await Promise.all(userAppoinments.map(async (userAppoinment) => {
                const { title, start, end, with_user_id } = userAppoinment.Appointment;
                const withName = await User.findByPk(with_user_id);
                return { title, start, end, withName: withName ? withName.name : null };
            }));
            res.status(200).json({ status: 200, data: formattedData, message: 'success get data' });
        } catch (error) {
            res.status(500).json({ message: error.message, status: 500 });
        }
    }
}

module.exports = AppointmentController