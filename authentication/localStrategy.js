const LocalStrategy = require('passport-local');
const users = require('../services/users');
const {veryfyPassword} = require('./password');
const boom = require('@hapi/boom');


const localStrategy = new LocalStrategy(async (username, password, done)=>{
  try {
    const user = await users.findByEmail(username);
    if(!user) done(boom.unauthorized(), false);
    const isPassword = await veryfyPassword(password, user.password);
    if(!isPassword) done(boom.unauthorized(), false);
    delete user.dataValues.password;
    done(null, user);
  } catch(err) {
    done(boom.unauthorized(), false);
  }
})

module.exports = localStrategy;
