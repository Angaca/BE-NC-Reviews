const db = require("../db/connection");
const { reviewData } = require("../db/data/test-data");
const format = require("pg-format");

const allowedColumns = Object.keys(reviewData[0]);
allowedColumns.push("comment_count");
allowedColumns.push("review_id");

const rejectWrongQuery = (method) => {
  return Promise.reject({ status: 400, msg: `Invalid ${method} query` });
};
const rejectWrongData = () => {
  return Promise.reject({ status: 404, msg: "Not found" });
};

exports.selectReviewById = async (review_id) => {
  const { rows } = await db.query(
    `SELECT reviews.*, COUNT(comment_id) AS comment_count
    FROM reviews 
    LEFT JOIN users ON users.username = reviews.owner
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;`,
    [review_id]
  );
  if (rows.length === 0) {
    return rejectWrongData();
  }
  return rows[0];
};

exports.updateReview = async (review_id, inc_votes, review_body) => {
  if (!inc_votes && !review_body)
    return Promise.reject({ status: 400, msg: "Malformed body" });

  const queryValues = [review_id];
  let valuesLen = queryValues.length + 1;
  let queryStr = `UPDATE reviews
  SET `;

  if (inc_votes) {
    queryStr += `votes = votes + $${valuesLen++}`;
    queryValues.push(inc_votes);
  }

  if (inc_votes && review_body) queryStr += `, `;

  if (review_body) {
    queryStr += `review_body = $${valuesLen} `;
    queryValues.push(review_body);
  }

  queryStr += `WHERE review_id = $1
  RETURNING *;`;

  const { rows } = await db.query(queryStr, queryValues);
  if (rows.length === 0) {
    return rejectWrongData();
  }
  return rows[0];
};

exports.reviewsCount = async () => {
  const { rows } = await db.query("SELECT review_id FROM reviews");
  return rows.length;
};

exports.selectReviews = async (
  sort_by = "created_at",
  order = "desc",
  category,
  limit = 10,
  p = 0
) => {
  if (!allowedColumns.includes(sort_by)) return rejectWrongQuery("sort");
  if (!["asc", "desc"].includes(order)) return rejectWrongQuery("order");
  if (!/^\d+$/.test(limit)) return rejectWrongQuery("limit");
  if (!/^\d+$/.test(p)) return rejectWrongQuery("pagination");

  let allowedCategories = [];
  if (category) {
    categories = await db.query(`SELECT slug FROM categories`);
    allowedCategories = categories.rows.map((category) => category.slug);
    if (!allowedCategories.includes(category))
      return rejectWrongQuery("category");
  }

  let queryValues = [];
  let queryStr = `SELECT reviews.*, COUNT(comment_id) AS comment_count
  FROM reviews 
  LEFT JOIN users ON users.username = reviews.owner
  LEFT JOIN comments ON comments.review_id = reviews.review_id`;

  if (category) {
    queryStr += ` WHERE reviews.category = $1`;
    queryValues.push(category);
  }

  queryStr += ` GROUP BY reviews.review_id
  ORDER BY reviews.${sort_by} ${order} 
  OFFSET ${p * limit} 
  LIMIT ${limit};`;

  const { rows } = await db.query(queryStr, queryValues);
  if (rows.length === 0) {
    if (allowedCategories.includes(category)) return [];
    return rejectWrongData();
  }
  return rows;
};

exports.selectCommentsByReviewId = async (review_id, limit = 10, p = 0) => {
  if (!/^\d+$/.test(limit)) return rejectWrongQuery("limit");
  if (!/^\d+$/.test(p)) return rejectWrongQuery("pagination");

  const { rows } = await db.query(
    `SELECT comment_id, votes, created_at, author, body FROM comments
  LEFT JOIN users ON users.username = comments.author
  WHERE review_id = $1
  OFFSET ${p * limit}
  LIMIT ${limit}`,
    [review_id]
  );
  return rows;
};

exports.insertComment = async (review_id, username, body) => {
  if (!review_id || !username || !body)
    return Promise.reject({ status: 400, msg: "Malformed body" });
  const queryStr = format(
    `INSERT INTO comments
  (review_id, author, body)
  VALUES
  %L
  RETURNING *;`,
    [[review_id, username, body]]
  );
  const { rows } = await db.query(queryStr);
  return rows[0];
};

exports.insertReview = async (
  owner,
  title,
  review_body,
  designer,
  category
) => {
  if (!owner || !title || !review_body || !designer || !category)
    return Promise.reject({ status: 400, msg: "Malformed body" });
  const queryStr = format(
    `INSERT INTO reviews
  (owner, title, review_body, designer, category)
  VALUES
  %L
  RETURNING *;`,
    [[owner, title, review_body, designer, category]]
  );
  const { rows } = await db.query(queryStr);
  rows[0].comment_count = 0;
  return rows[0];
};

exports.dropReview = async (review_id) => {
  if (!/^\d+$/.test(review_id))
    return Promise.reject({ status: 400, msg: "Invalid data" });
  const { rows } = await db.query(`SELECT review_id FROM reviews;`);
  const validIds = rows.map((id) => id.review_id);
  if (!validIds.includes(+review_id))
    return Promise.reject({ status: 404, msg: "Not existent Id" });
  await db.query(
    `DELETE FROM reviews
  WHERE review_id = $1;`,
    [review_id]
  );
  return;
};
