const {
  getUsers,
  getUserByUsername,
  patchUser,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserByUsername).patch(patchUser);

module.exports = usersRouter;
