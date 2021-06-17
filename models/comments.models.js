const db = require("../db/connection");

exports.dropCommentById = async (comment_id) => {
  await db.query(
    `DELETE FROM comments
    WHERE comment_id = $1;`,
    [comment_id]
  );
};
