const jwt = require('jsonwebtoken');

//create token
function createToken(user){
  const payload = {
    id: user.id,
    role: user.role
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
}

//verify token
function verifyToken(token){
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded;
}

module.exports = {
  createToken,
  verifyToken
}
