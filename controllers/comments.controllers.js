const { dropCommentById } = require("../models/comments.models");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  dropCommentById(comment_id)
    .then(() => res.status(204).send({}))
    .catch(next);
};
