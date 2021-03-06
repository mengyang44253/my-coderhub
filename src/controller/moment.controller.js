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

    const res=await momentService.update(content,momentId)


    ctx.body=res
  }
  async remove(ctx,next){
    const {momentId}=ctx.params
    const res=await momentService.remove(momentId)
    ctx.body=res
  }
  async addLabels(ctx,next){
    const {labels}=ctx
    const {momentId}=ctx.params
    //添加所有的标签
    for (const label of labels) {
      //判断标签是否已经和动态有关系
      const isExist=await momentService.hasLabel(momentId,label.id)
      if(!isExist){
        const result =await momentService.addLabels(momentId,label.id)
      }
    }

    ctx.body=res
  }
}

module.exports=new MomentController()