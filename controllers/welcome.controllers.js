exports.welcomeAPI = (req, res) => {
  res.status(200).send({
    msg: "Welcome! Please see the available endpoints below",
    "GET /api/categories": "Get all the available categories",
    "GET /api/reviews/:review_id": "Get a specific review by its id",
    "GET /api/reviews":
      "Get all the reviews - _allows to sort by sort_by=validColumns > default to created_at, order=asc/desc > default to desc; limit=positiveNumber > default to 10 results, decide pagination p=positiveNumber > default to 0 and filter by category=existingCategory_.",
    "GET /api/reviews/:review_id/comments":
      "Get all the comments relative to the specific review id",
    "GET /api/users": "Get all the users",
    "GET /api/users/:username": "Get the specific user by its username",
    "PATCH /api/reviews/:review_id":
      "Allows to increment the votes of the specific review - only accepts an object format like >> { inc_votes : Number }",
    "PATCH /api/comments/:comment_id":
      "Allows to increment the votes of the specific comment - only accepts an object format like >> { inc_votes : Number }",
    "POST /api/reviews/:review_id/comments":
      "Allows to post a new comment - _only accepts an object format like >> { username: existingUsername, body: String }",
    "DELETE /api/comments/:comment_id":
      "It will delete the comment of the given id",
  });
};

exports.welcome = (req, res) => {
  res.send({ msg: "Welcome! Please go to the API endpoint >> /api" });
};
