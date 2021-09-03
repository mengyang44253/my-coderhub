const service = require("../service/user.service");
const fileService=require('../service/file.service')

const {AVATAR_PATH}=require('../constants/file-path')

class UserController {
  async createUser(ctx, next) {
    const user = ctx.request.body;

    const result = await service.createUser(user);

    ctx.body = result;
  }
  async avatarInfo(ctx,next){
    //1.用户的头像
    const {userId}=ctx.params

    
    const avatarInfo=await fileService.getAvatarByUserId(userId)

    ctx.response.set('content-type',avatarInfo.mimetype)
    ctx.body=fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)

  }
}

module.exports = new UserController();
