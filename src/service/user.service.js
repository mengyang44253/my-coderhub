const connection = require("../app/database");

class UserService {
  async createUser(user) {
    const { name, password } = user;
    const statement = `INSERT INTO users (name,password) VALUES (?,?);`;

    const result = await connection.execute(statement, [name, password]);

    return result[0];
  }
  async getUserByName(name) {
    let statement = `SELECT * FROM users WHERE name=?;`;
    const res = await connection.execute(statement, [name]);
    return res[0];
  }
}

module.exports = new UserService();
