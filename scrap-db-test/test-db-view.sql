\c nc_games_test

-- SELECT reviews.title, COUNT(comment_id) AS comment_count
--     FROM reviews 
--     LEFT JOIN users ON users.username = reviews.owner
--     LEFT JOIN comments ON comments.review_id = reviews.review_id
--     GROUP BY reviews.review_id
--     ORDER BY reviews.category ASC
--     OFFSET 5 
--     LIMIT 5;

-- SELECT * FROM categories

-- SELECT comment_id, votes, created_at, author, body FROM comments
-- LEFT JOIN users ON users.username = comments.author
-- WHERE review_id = 2;
 
-- SELECT * FROM comments
--     WHERE comment_id = 1;

-- SELECT review_body FROM reviews;

INSERT INTO reviews
  (owner, title, review_body, designer, category)
  
  SELECT owner, title, review_body, designer, category, COUNT(comment_id) AS comment_count FROM reviews 
    LEFT JOIN users ON users.username = reviews.owner
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id
  RETURNING *;