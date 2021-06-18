const {
  selectReviewById,
  updateReview,
  selectReviews,
  selectCommentsByReviewId,
  insertComment,
  insertReview,
} = require("../models/reviews.models");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => res.send({ review }))
    .catch(next);
};

exports.patchReview = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateReview(review_id, inc_votes)
    .then((review) => res.send({ review }))
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category, limit, p } = req.query;
  selectReviews(sort_by, order, category, limit, p)
    .then((reviews) => {
      res.send({ reviews, total_count: reviews.length });
    })
    .catch(next);
};

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  const { limit, p } = req.query;
  selectCommentsByReviewId(review_id, limit, p)
    .then((comments) => res.send({ comments }))
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  const { username, body } = req.body;
  insertComment(review_id, username, body)
    .then((comment) => res.status(201).send({ comment }))
    .catch(next);
};

exports.postReview = (req, res, next) => {
  const { owner, title, review_body, designer, category } = req.body;
  insertReview(owner, title, review_body, designer, category)
    .then((review) => res.status(201).send({ review }))
    .catch(next);
};
