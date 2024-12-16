const userRouter = require("express").Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/auth");

userRouter.get(
    "/",
    authMiddleware,
    UserController.getAll
);

userRouter.get(
    "/timezone",
    authMiddleware,
    UserController.getListUserByPreferredTimezone
);

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
module.exports = userRouter;