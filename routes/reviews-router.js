const reviewsRouter = require("express").Router();
const {
  getReviews,
  getReviewById,
  patchReview,
} = require("../controllers/reviews.controllers");

reviewsRouter.route("/").get(getReviews);
reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReview);

module.exports = reviewsRouter;
