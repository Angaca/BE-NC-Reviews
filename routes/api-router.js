const apiRouter = require("express").Router();
const { welcomeAPI } = require("../controllers/welcome.controllers");
const categoriesRouter = require("./categories-router");
const reviewsRouter = require("./reviews-router");

apiRouter.get("/", welcomeAPI);

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
