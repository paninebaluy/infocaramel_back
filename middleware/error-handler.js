const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = status === 500 ? 'Internal Server Error' : error.message;
  res.status(status).send({
    error: {
      status,
      message,
    },
  });
  next();
};

module.exports = errorHandler;
