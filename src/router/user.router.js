const Router = require("koa-router");

const userRouter = new Router({ prefix: "/users" });

const { verifyUser } = require("../middleware/user.middleware");

const { createUser } = require("../controller/user.controller");

userRouter.post("/", verifyUser,createUser);

module.exports = userRouter;
