const {
  dropCommentById,
  updateCommentById,
} = require("../models/comments.models");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  dropCommentById(comment_id)
    .then(() => res.status(204).send({}))
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes, body } = req.body;
  updateCommentById(comment_id, inc_votes, body)
    .then((comment) => res.send({ comment }))
    .catch(next);
};
