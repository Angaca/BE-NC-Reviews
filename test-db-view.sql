\c nc_games_test

SELECT reviews.category, COUNT(comment_id) AS comment_count
    FROM reviews 
    LEFT JOIN users ON users.username = reviews.owner
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.category ASC;

SELECT * FROM categories

 