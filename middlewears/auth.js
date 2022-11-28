const boom = require('@hapi/boom');

function autentication(req, res, next){
  if(req.query['api'] === process.env.API_KEY){
    next()
  }else{
    next(boom.unauthorized('Not authorized'))
  }
}

module.exports = autentication;
