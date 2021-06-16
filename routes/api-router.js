const apiRouter = require("express").Router();
const categoriesRouter = require("./categories-router");
const reviewsRouter = require("./reviews-router");

apiRouter.get("/", (req, res) => {
  res.status(200).send({
    "GET /api/categories": "Get all the available categories",
    "GET /api/reviews/:review_id": "Get a specific review by the id",
    "PATCH /api/reviews/:review_id":
      "Allow to increment the votes of the specific review",
    "GET /api/reviews": "Get all the reviews",
    "GET /api/reviews/:review_id/comments":
      "GEt all the comments relative the specific review",
    "POST /api/reviews/:review_id/comments": "Allow to post a new comment",
  });
});

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
