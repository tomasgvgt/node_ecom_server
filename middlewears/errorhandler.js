function boomErrorHandler(err, req, res, next){
  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode);
  }
  next(err);
}
function sendError(err, req, res, next){
  res.send({
    message: err.message,
    data: ""
  })
}

module.exports = {
  boomErrorHandler,
  sendError
}
