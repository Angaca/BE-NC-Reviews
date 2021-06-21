const db = require("../db/connection");

exports.selectUsers = async () => {
  const { rows } = await db.query(`SELECT username FROM users;`);
  return rows;
};

exports.selectUserByUsername = async (username) => {
  const { rows } = await db.query(
    `SELECT * FROM users
    WHERE username = $1;`,
    [username]
  );
  return rows;
};

exports.updateUser = async (username, avatar_url, name) => {
  if (!avatar_url && !name)
    return Promise.reject({ status: 400, msg: "Malformed body" });

  const queryValues = [username];
  let valuesLen = queryValues.length + 1;
  let queryStr = `UPDATE users
  SET `;

  if (avatar_url) {
    queryStr += `avatar_url = $${valuesLen++}`;
    queryValues.push(avatar_url);
  }

  if (avatar_url && name) queryStr += `, `;

  if (name) {
    queryStr += `name = $${valuesLen} `;
    queryValues.push(name);
  }

  queryStr += `WHERE username = $1
  RETURNING *;`;

  const { rows } = await db.query(queryStr, queryValues);
  if (rows.length === 0) {
    return rejectWrongData();
  }
  return rows;
};
