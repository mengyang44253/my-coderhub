const Koa = require("koa");

const bodyParser = require("koa-bodyparser");

// const userRouter = require("../router/user.router");
// const authRouter=require('../router/auth.router')
const useRoutes=require('../router')

const errorHandle = require("./error.handle");

const app = new Koa();

//第一种方法
useRoutes(app);
//第二种方法
// app.useRoutes = useRoutes
// app.useRoutes()

app.use(bodyParser());
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());

app.on("error", errorHandle);

module.exports = app;
