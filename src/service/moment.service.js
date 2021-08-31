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
    //加上评论的sql语句
    // SELECT
    //  m.id id,m.content content ,m.createAt createTime,m.updateAt updateTime,
    //  JSON_OBJECT('id',u.id,'name',u.name) author,
    //  JSON_ARRAYAGG(
    // 	JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,'user',JSON_OBJECT('id',cu.id,'name',cu.name))
    //  ) comments
    // FROM moment m
    // LEFT JOIN users u ON m.user_id=u.id
    // LEFT JOIN comment c ON c.moment.id=m.id
    // LEFT JOIN users cu ON c.user_id =cu.id
    // WHERE m.id=?
    const res = await connection.execute(statement, [id]);
    return res[0];
  }
  async getMomentList(offset, size) {
    const statement = `
      SELECT
 m.id id,m.content content ,m.createAt createTime,m.updateAt updateTime,
 JSON_OBJECT('id',u.id,'name',u.name) author
FROM moment m
LEFT JOIN users u ON m.user_id=u.id
LIMIT ?,?;
    `;

    const res = await connection.execute(statement, [offset, size]);
  }
  async update(content, momentId) {
    const statement = `SELECT moment SET content=? WHERE id=?`;
    const [res] = await connection.execute(statement, [content, momentId]);
    return res;
  }
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id=?`;
    const [res] = await connection.execute(statement, [momentId]);
    return res;
  }
}

module.exports = new MomentService();
