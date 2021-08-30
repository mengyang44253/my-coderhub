const connection = require("../app/database");

class MomentService {
  async create(content, user_id) {
    const statement = `INSERT INTO moment (content,user_id) VALUES(?,?);`;
    const res = await connection.execute(statement, [content, user_id]);
    return res;
  }
  async getMomentById(id) {
    const statement = `SELECT
 m.id id,m.content content ,m.createAt createTime,m.updateAt updateTime,
 JSON_OBJECT('id',u.id,'name',u.name) user
FROM moment m
LEFT JOIN users u ON m.user_id=u.id
WHERE m.id=?`;
    const res = await connection.execute(statement, [id]);
    return res[0];
  }
  async getMomentList(offset, size) {
    const statement = `
      SELECT
 m.id id,m.content content ,m.createAt createTime,m.updateAt updateTime,
 JSON_OBJECT('id',u.id,'name',u.name) user
FROM moment m
LEFT JOIN users u ON m.user_id=u.id
LIMIT ?,?;
    `;

    const res=await connection.execute(statement,[offset,size])

  }
}

module.exports = new MomentService();
