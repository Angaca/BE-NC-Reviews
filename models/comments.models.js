const db = require("../db/connection");

exports.dropCommentById = async (comment_id) => {
  await db.query(
    `DELETE FROM comments
    WHERE comment_id = $1;`,
    [comment_id]
  );
};

exports.updateCommentById = async (comment_id, inc_votes) => {
  if (!inc_votes) return Promise.reject({ status: 400, msg: "Malformed body" });
  const { rows } = await db.query(
    `UPDATE comments
  SET
    votes = votes + $2
  WHERE comment_id = $1
  RETURNING *;
  `,
    [comment_id, inc_votes]
  );
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Not found" });
  }
  return rows;
};
