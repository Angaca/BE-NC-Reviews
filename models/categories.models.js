const db = require("../db/connection");
const format = require("pg-format");

exports.selectCategories = async () => {
  const { rows } = await db.query(`SELECT * FROM categories;`);
  return rows;
};

exports.insertCategory = async (slug, description) => {
  if (!slug || !description)
    return Promise.reject({ status: 400, msg: "Malformed body" });
  const queryStr = format(
    `INSERT INTO categories
  (slug, description)
  VALUES
  %L
  RETURNING *;`,
    [[slug, description]]
  );
  const { rows } = await db.query(queryStr);
  return rows[0];
};
