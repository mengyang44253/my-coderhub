const errorTypes = require("../constants/error-types");
const service = require("../service/user.service");
const authService=require('../service/auth.service')
const md5password = require("../utils/password-handle");
const {PUBLIC_KEY}=require('../app/config')

const verifyLogin = async (ctx, next) => {
  //获取用户名和密码
  const { name, password } = ctx.request.body;

  //判断用户名和密码为空
  //判断用户名或者密码不能为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  //判断用户是否存在
  const res = await service.getUserByName(name);
  if (res.length) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  //判断密码和数据库中的密码是否一致
  if (md5password(password) !== res.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = res;
  await next();
};

const verifyAuth = async (ctx,next) => {
  //获取token
  const authorization=ctx.headers.authorization
  const token=authorization.replace('Bearer','')
  if(!authorization){
    const error=new Error(errorTypes.UNAUTHORIZATION) 
    return ctx.app.emit('error',error,ctx)
  }

  //验证token
  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user=res
    await next()
  } catch (err) {
    const error=new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error',error,ctx)
  }

};

const verifyPermission=(ctx,next)=>{
  //获取参数
  const {momentId}=ctx.params
  const {id}=ctx.user

    //查询是否具备权限
    try {
      
    } catch (error) {
      
    }
    const isPermission=await authService.checkMoment(momentId,id)
    if (!isPermission) {
      const error = new Error(errorTypes.UNPERMISSION);
      return ctx.app.emit('error',error,ctx)
    }



  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
