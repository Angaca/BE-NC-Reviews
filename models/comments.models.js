const db = require("../db/connection");

exports.dropCommentById = async (comment_id) => {
  await db.query(
    `DELETE FROM comments
    WHERE comment_id = $1;`,
    [comment_id]
  );
};

exports.updateCommentById = async (comment_id, inc_votes, body) => {
  if (!inc_votes && !body)
    return Promise.reject({ status: 400, msg: "Malformed body" });

  const queryValues = [comment_id];
  let valuesLen = queryValues.length + 1;
  let queryStr = `UPDATE comments
  SET `;

  if (inc_votes) {
    queryStr += `votes = votes + $${valuesLen++}`;
    queryValues.push(inc_votes);
  }

  if (inc_votes && body) queryStr += `, `;

  if (body) {
    queryStr += `body = $${valuesLen} `;
    queryValues.push(body);
  }

  queryStr += `WHERE comment_id = $1
  RETURNING *;`;

  const { rows } = await db.query(queryStr, queryValues);
  if (rows.length === 0) {
    return rejectWrongData();
  }
  return rows;
};
