const { AVATAR_PATH } = require("../constants/file-path");
const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { APP_HOST, APP_POST } = require("../app/config");

class FileController {
  async saveAvatarInfo(ctx, next) {
    //获取图像相关的信息
    const { mimetype, filename, size } = ctx.req.file;
    const { id } = ctx.user;
    //将图像信息数据保存到数据库中
    const res = await fileService.createAvatar(filename, mimetype, size);

    //将图片地址保存到users表中
    const avatarUrl = `${APP_HOST}:${APP_POST}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(id, avatarUrl);

    ctx.body = {
      statusCode: 1110,
      message: "上传成功",
    };
  }

  async savePictureInfo(ctx, next) {
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.query;

    for (const file of files) {
      const { filename, mimetype, size } = file;
      const res = await fileService.createFile(
        filename,
        mimetype,
        size,
        id,
        momentId
      );
    }
    ctx.body = "上传完成";
  }
}

module.exports = new FileController();
