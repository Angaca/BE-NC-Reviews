const db = require("../db/connection");

const rejectWrongId = () => {
  return Promise.reject({ status: 404, msg: "Not found" });
};

exports.selectReviewById = async (review_id) => {
  const { rows } = await db.query(
    `SELECT * FROM reviews 
    JOIN users ON users.username = reviews.owner
    WHERE review_id = $1 `,
    [review_id]
  );
  if (rows.length === 0) {
    return rejectWrongId();
  }
  const comments = await db.query(
    `SELECT * FROM comments WHERE review_id = $1`,
    [review_id]
  );
  rows[0].comment_count = comments.rows.length;
  return rows;
};

exports.updateReview = async (review_id, inc_votes) => {
  if (!inc_votes) return Promise.reject({ status: 400, msg: "Malformed body" });
  const { rows } = await db.query(
    `UPDATE reviews
  SET
    votes = votes + $2
  WHERE review_id = $1
  RETURNING *`,
    [review_id, inc_votes]
  );
  if (rows.length === 0) {
    return rejectWrongId();
  }
  return rows;
};

exports.selectReviews = () => {};
