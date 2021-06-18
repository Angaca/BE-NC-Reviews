const reviewsRouter = require("express").Router();
const {
  getReviews,
  getReviewById,
  patchReview,
  getCommentsByReviewId,
  postComment,
  postReview,
  deleteReview,
} = require("../controllers/reviews.controllers");

reviewsRouter.route("/").get(getReviews).post(postReview);
reviewsRouter
  .route("/:review_id")
  .get(getReviewById)
  .patch(patchReview)
  .delete(deleteReview);
reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postComment);

module.exports = reviewsRouter;
