const Router=require('koa-router')

const momentRouter=new Router({prefix:'/moment'})


const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

momentRouter.patch("/:momentId", update);
const { create, detail, list } = require("../controller/moment.controller");

// momentRouter.post("/", verifyAuth,create);
momentRouter.post("/",create);
momentRouter.get('/',list)
momentRouter.get('/:momentId',detail)
//1.用户必须登录 用户具有权限
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);


module.exports=momentRouter