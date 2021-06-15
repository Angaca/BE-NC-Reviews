const express = require("express");
const { getCategories } = require("./controllers/categories.controllers");
const {
  getReviewById,
  patchReview,
  getReviews,
} = require("./controllers/reviews.controllers");
const {
  send404,
  handlingServerErrors,
  handlingPSQLErrors,
  handlingCustomErrors,
} = require("./errors");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.patch("/api/reviews/:review_id", patchReview);
app.get("/api/reviews", getReviews);

app.use(send404);

app.use(handlingCustomErrors);
app.use(handlingPSQLErrors);
app.use(handlingServerErrors);

module.exports = app;
