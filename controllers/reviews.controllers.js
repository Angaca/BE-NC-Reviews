const {
  selectReviewById,
  updateReview,
  selectReviews,
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
    .then((review) => res.status(202).send({ review }))
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  selectReviews();
};
