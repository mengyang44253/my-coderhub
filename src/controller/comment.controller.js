const commentService=require('../service/')


class MomentController{
  async create (ctx,next){
    const {momentId,content}=ctx.request.body
    const {id}=ctx.user

    const res=await commentService.create(momentId,content,id)
    ctx.body=res
  }
  async reply(ctx,next){
    const {momentId,content,commentId}=ctx.request.body
    const {id}=ctx.user
    const res=await commentService.reply(momentId,content,commentId,userId)


    ctx.body=res
  }
  async update(ctx,next){
    const {commentId}=ctx.params
    const {content}=ctx.request.body

    const res=await commentService.update

    ctx.body=res

  }
  async remove(ctx,next){
    const {commentId}=ctx.params
    const res=await commentService.remove(commentId)
  }
  async list(ctx,next){
    const {momentId}=ctx.query
    const res=await commentService.getCommentsByMomentId(momentId)
    ctx.body=res
  }
}


module.exports=new MomentController()