const express = require("express");
const { getCategories } = require("./controllers/categories.controllers");
const { getReviewById } = require("./controllers/reviews.controllers");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
