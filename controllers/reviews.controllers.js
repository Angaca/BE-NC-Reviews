const { selectReviewById } = require("../models/reviews.models");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => res.send({ review }))
    .catch(next);
};
