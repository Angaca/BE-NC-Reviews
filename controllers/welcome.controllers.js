exports.welcomeAPI = (req, res) => {
  res.status(200).send({
    msg: "Welcome! Please see the available endpoints below",
    "GET /api/categories": "Get all the available categories",
    "GET /api/reviews/:review_id": "Get a specific review by the id",
    "PATCH /api/reviews/:review_id":
      "Allow to increment the votes of the specific review",
    "GET /api/reviews": "Get all the reviews",
    "GET /api/reviews/:review_id/comments":
      "Get all the comments relative to the specific review",
    "POST /api/reviews/:review_id/comments": "Allow to post a new comment",
  });
};

exports.welcome = (req, res) => {
  res.send({ msg: "Welcome! Please go to the API endpoint" });
};
