const boom = require('@hapi/boom');

function autentication(req, res, next){
  if(req.query['api'] === '321'){
    next()
  }else{
    next(boom.unauthorized('Not authorized'))
  }
}

module.exports = autentication;
