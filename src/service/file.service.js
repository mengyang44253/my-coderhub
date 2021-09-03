const connection=require('../app/database')

class FileService{
  async createAvatar(filename,mimetype,size,user_id){
    const statement=`INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?)`
    const [res]=await connection.execute(statement,[filename,mimetype,size,user_id])
    return res
  }
  async getAvatarByUserId(userId){
    const statement=`SELECT * FROM avatar WHERE user_id=?`
    const [res]=await connection.execute(statement,[userId])
    return res
  }
  async createFile(filename,mimetype,size,userId,momentId){
    const statement = `INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?)`;
    const [res] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
      momentId
    ]);
    return res
  }
}

module.exports=new FileService()