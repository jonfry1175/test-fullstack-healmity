const AppointmentController = require("../controllers/AppointmentController");
const authMiddleware = require("../middlewares/auth");
const appointmentRoute = require("express").Router();

appointmentRoute.get("/", authMiddleware, AppointmentController.getAll);
appointmentRoute.post("/", authMiddleware, AppointmentController.create);
appointmentRoute.get("/list", authMiddleware, AppointmentController.getListUserAppoinment);

module.exports = appointmentRoute