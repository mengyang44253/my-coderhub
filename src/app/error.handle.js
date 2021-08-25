const errorTypes = require("../constants/error-type");

const errorHandle = (error, ctx) => {
  console.log(error);
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_NOT_REQUIRED:
      status = 400;
      message = "用户名或者密码不能为空";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;
      message = "用户名已存在";
      break;
    default:
      status = 404;
      message = "nottttt found";
      break;
  }
};

module.exports = errorHandle;
