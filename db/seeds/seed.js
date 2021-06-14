const db = require("../connection");
const format = require("pg-format");
const { categoriesValues, usersValues } = require("../utils/data-manipulation");

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  await db.query(`DROP TABLE IF EXISTS comments, reviews, users, categories;`);
  await db.query(`CREATE TABLE categories (
    slug VARCHAR(100) PRIMARY KEY NOT NULL,
    description TEXT NOT NULL
  );`);
  await db.query(`CREATE TABLE users (
    username VARCHAR(100) PRIMARY KEY NOT NULL,
    avatar_url TEXT NOT NULL,
    name VARCHAR(100) NOT NULL
  );`);
  await db.query(`CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    review_body TEXT NOT NULL,
    designer VARCHAR(100) NOT NULL,
    review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    votes INT DEFAULT 0,
    category VARCHAR(100) REFERENCES categories(slug),
    owner VARCHAR(100) REFERENCES users(username),
    create_at DATE DEFAULT CURRENT_TIMESTAMP
  );`);
  await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(100) REFERENCES users(username),
    review_id INT REFERENCES reviews(review_id),
    votes INT DEFAULT 0,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    body TEXT NOT NULL
  )`);
  const categoriesQuery = format(
    `INSERT INTO categories
  (slug, description)
  VALUES
  %L
  RETURNING *;`,
    categoriesValues(categoryData)
  );
  await db.query(categoriesQuery);
  const usersQuery = format(
    `INSERT INTO users
    (username, avatar_url, name)
    VALUES
    %L
    RETURNING *;`,
    usersValues(userData)
  );
  await db.query(usersQuery);
  // const table = await db.query(`SELECT * FROM categories;`);
  // console.table(table.rows);
};

module.exports = seed;
