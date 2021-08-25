const service = require("../service/user.service");

class UserController {
  async createUser(ctx, next) {
    console.log(ctx.request);
    const user = ctx.request.body;

    const result = await service.createUser(user);

    ctx.body = result;
  }
}

module.exports = new UserController();
