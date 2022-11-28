const bcrypt = require('bcrypt');

async function veryfyPassword(password, hash){
  const isEqual = await bcrypt.compare(password, hash);
  return isEqual;
}

async function encryptPassword(password){
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

module.exports = {
  veryfyPassword,
  encryptPassword
}
