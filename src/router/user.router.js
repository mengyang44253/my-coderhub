const Router = require("koa-router");

const userRouter = new Router({ prefix: "/users" });

const { verifyUser, handlePassword } = require("../middleware/user.middleware");

const { createUser,avatarInfo } = require("../controller/user.controller");

userRouter.post("/", verifyUser,handlePassword,createUser);
userRouter.get("/:userId", avatarInfo);

module.exports = userRouter;
