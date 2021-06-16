exports.handlingCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlingPSQLErrors = (err, req, res, next) => {
  if ((err.code = "22P02")) {
    //console.log(err);
    res.status(400).send({ msg: "Invalid type of data" });
  } else next(err);
};

exports.handlingServerErrors = (err, req, res, next) => {
  console.log(err, "<< unhandled error");
  res.status(500).send({ msg: "Internal server error" });
};

exports.send404 = (req, res, next) => {
  res.status(404).send({ msg: "Not found" });
};
