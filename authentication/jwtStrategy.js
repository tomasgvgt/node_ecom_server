const {Strategy, ExtractJwt} = require('passport-jwt');
const users = require('../services/users');
const boom = require('@hapi/boom');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}

const jwtStrategy = new Strategy(options, async (payload, done)=>{
  try{
    const user = await users.findOne(payload.id);
    if(!user) done(boom.unauthorized(), false);
    done(null, payload)
  }catch(error){
    done(boom.unauthorized(), false);
  }
})

module.exports = jwtStrategy;
