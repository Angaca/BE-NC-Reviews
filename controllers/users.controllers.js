const {
  selectUsers,
  selectUserByUsername,
  updateUser,
} = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => res.send(users))
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username)
    .then((user) => res.send({ user }))
    .catch(next);
};

exports.patchUser = (req, res, next) => {
  const { username } = req.params;
  const { avatar_url, name } = req.body;
  updateUser(username, avatar_url, name)
    .then((user) => res.send({ user }))
    .catch(next);
};
