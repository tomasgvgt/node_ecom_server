const boom = require("@hapi/boom")

//Dimamically create varification middlewears accoring to the schema and reques property being received.
function dataValidator(schema, property){
  return (req, res, next)=>{
    const data = req[property];
    const {error} = schema.validate(data, {abortEarly: false});
    if(error){
      next(boom.badRequest(error))
    }
    next();
  }
}

module.exports = dataValidator;
