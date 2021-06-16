const reviewsRouter = require("express").Router();
const {
  getReviews,
  getReviewById,
  patchReview,
  getCommentsByReviewId,
  postComment,
} = require("../controllers/reviews.controllers");

reviewsRouter.route("/").get(getReviews);
reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReview);
reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postComment);

module.exports = reviewsRouter;
