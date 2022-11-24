function successResponse(req, res, info){
  res.status(info.status);
  const message = info.message;
  res.send({
    message,
    body: res.body
  })
}

function errorResponse(err, req, res, info){
  if(info){
    const status = info.status;
    const message = info.message;
    res.status(status);
    res.json({
      message,
      data: ""
    })
  }else{
    const status = 501;
    const message = "Couldnt process you request, please try again later";
    res.status(status);
    res.json({
      message,
      data: ""
    })
  }

}


module.exports = {
  successResponse,
  errorResponse
}
