const AppointmentController = require("../controllers/AppointmentController");
const appointmentRoute = require("express").Router();

appointmentRoute.get("/", AppointmentController.getAll);
appointmentRoute.post("/", AppointmentController.create);

module.exports = appointmentRoute