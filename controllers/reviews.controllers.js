const {
  selectReviewById,
  updateReview,
  selectReviews,
  selectCommentsByReviewId,
  insertComment,
  insertReview,
  dropReview,
  reviewsCount,
} = require("../models/reviews.models");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => res.send({ review }))
    .catch(next);
};

exports.patchReview = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes, review_body } = req.body;
  updateReview(review_id, inc_votes, review_body)
    .then((review) => res.send({ review }))
    .catch(next);
};

exports.getReviews = async (req, res, next) => {
  const total_count = await reviewsCount();
  const { sort_by, order, category, limit, p } = req.query;
  selectReviews(sort_by, order, category, limit, p)
    .then((reviews) => {
      res.send({
        total_count: total_count,
        current_count: reviews.length,
        reviews,
      });
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

exports.deleteReview = (req, res, next) => {
  const { review_id } = req.params;
  dropReview(review_id)
    .then(() => res.status(204).send({}))
    .catch(next);
};
