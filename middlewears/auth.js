const boom = require('@hapi/boom');

function autentication(req, res, next){
  if(req.headers['api'] === '321'){
    next()
  }else{
    next(boom.unauthorized('Not authorized'))
  }
}

module.exports = autentication;
