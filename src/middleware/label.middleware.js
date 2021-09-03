const momentService=require('../service/label.service')

const verifyLabelExists=async (ctx,next)=>{
  //1.取出所有要添加的标签
  const{labels}=ctx.request.body


  //判断每一个标签在label表里面是否存在
  const newLabels=[]
  for (const name of labels) {
    const labelResult=await momentService.getLabelByName(name)
    const label={name}
    if (!labelResult) {
      //创建标签数据
      const res = await momentService.create(name);
      label.id=res.insertId
    }else{
      label.id=labelResult.id
    }
    newLabels.push(label)
  }
  ctx.labels=newLabels

}