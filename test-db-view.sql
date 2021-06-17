\c nc_games_test

-- SELECT reviews.category, COUNT(comment_id) AS comment_count
--     FROM reviews 
--     LEFT JOIN users ON users.username = reviews.owner
--     LEFT JOIN comments ON comments.review_id = reviews.review_id
--     GROUP BY reviews.review_id
--     ORDER BY reviews.category ASC;

-- SELECT * FROM categories

-- SELECT comment_id, votes, created_at, author, body FROM comments
-- LEFT JOIN users ON users.username = comments.author
-- WHERE review_id = 2;
 
SELECT * FROM users
    WHERE username = 'bainesface';