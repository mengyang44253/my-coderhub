const errorTypes = require("../constants/error-type");
const service = require("../service/user.service");

const verifyUser = async (ctx, next) => {
  console.log(132132132);
  const { name, password } = ctx.request.body;
  console.log(name, password);

  //判断用户名或者密码不能为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_NOT_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  console.log(111111);

  //判断用户名重复
  const res = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  console.log(222222);

  // await next();
};

module.exports = {
  verifyUser,
};
