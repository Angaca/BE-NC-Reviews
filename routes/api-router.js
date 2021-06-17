const apiRouter = require("express").Router();
const { welcomeAPI } = require("../controllers/welcome.controllers");
const categoriesRouter = require("./categories-router");
const commentsRouter = require("./comments-router");
const reviewsRouter = require("./reviews-router");
const usersRouter = require("./users-router");

apiRouter.get("/", welcomeAPI);

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
