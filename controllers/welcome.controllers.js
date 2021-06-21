exports.welcomeAPI = (req, res, next) => {
  res.send({
    msg: "Welcome! Please see the available endpoints below",
    "GET /api/categories": "Get all the available categories",
    "GET /api/reviews/:review_id": "Get a specific review by its id",
    "GET /api/reviews":
      "Get all the reviews - _allows to sort by ?sort_by=validColumns > default to created_at, ?order=asc/desc > default to desc; ?limit=positiveNumber > default to 10 results, decide pagination ?p=positiveNumber > default to 0 and filter by ?category=existingCategory_.",
    "GET /api/reviews/:review_id/comments":
      "Get all the comments relative to the specific review id - allows to limit results via query ?limit=positiveNumber > default to 10 results, decide pagination ?p=positiveNumber > default to 0",
    "GET /api/users": "Get all the users",
    "GET /api/users/:username": "Get the specific user by its username",
    "PATCH /api/reviews/:review_id":
      "Allows to increment the votes of the specific review or to change its body - only accepts an object format like >> (at least one of the keys is mandatory) >> { inc_votes: Number, review_body: String }",
    "PATCH /api/comments/:comment_id":
      "Allows to increment the votes of the specific comment or to change its body - only accepts an object format like >> (at least one of the keys is mandatory) >> { inc_votes: Number, review_body: String }",
    "POST /api/category":
      "Allows to post a new category - only accepts an object format like >> { slug: String, description: String }",
    "POST /api/reviews":
      "Allows to post a new comment - only accepts an object format like >> { owner: existingUsername, title: String, review_body: String, designer: String, category: existingCategory }",
    "POST /api/reviews/:review_id/comments":
      "Allows to post a new comment - only accepts an object format like >> { username: existingUsername, body: String }",
    "DELETE /api/comments/:comment_id":
      "It will delete the comment of the given id",
    "DELETE /api/reviews/:review_id":
      "It will delete the review of the given id",
  });
};

exports.welcome = (req, res, next) => {
  res.send({ msg: "Welcome! Please go to the API endpoint >> /api" });
};
