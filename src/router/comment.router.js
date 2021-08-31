const Router = require("koa-router");

const commentRouter = new Router({ prefix: "/comment" });

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

const { create, reply, remove,list } = require("../controller/comment.controller");
//添加评论
commentRouter.post("/", verifyAuth, create);

//回复评论
commentRouter.post("/reply", verifyAuth, reply);

//修改评论
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, update);

//删除
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove);
//获取评论列表
commentRouter.get("/",list)

module.exports = commentRouter;
