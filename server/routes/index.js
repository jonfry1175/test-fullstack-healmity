const router = require("express").Router();
const appointmentRoute = require("./appointments");
const userRouter = require("./users");


router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.use("/users", userRouter);
router.use('/appointments', appointmentRoute);


module.exports = router;