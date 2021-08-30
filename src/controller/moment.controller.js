const momentService=require('../service/moment.service')

class MomentController{
  async create(ctx,next){
    ctx.body = "发表动态成功";
    //获取数据（user_id,content）
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    //将数据插入到数据库中
    const res=await momentService.create(userId,content)
  }
  async detail(ctx,next){
    //拿到momentid
    const momentId=ctx.params.momentId

    const res=await momentService.getMomentById(momentId)

    // ctx.body='获取某一条动态的详情'+momentId
    ctx.body=res
  }
  async list(ctx,next){
    const {offset,size}=ctx.query

    const res=await momentService.getMomentList(offset,size)
    ctx.body=res
  }
  async update(ctx,next){
    const {momentId}=ctx.params
    const {content}=ctx.request.body
    const {id}=ctx.user
  }
}

module.exports=new MomentController()