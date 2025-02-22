/* Take in an email and generate a Gravatar url */

//Import crypto, implemented within Node.js
const crypto = require('crypto');

const gravatar = (email) => {
  //Hash the email
  const hash = crypto
    .createHash('md5')
    .update(email.trim().toLowerCase())
    .digest('hex');
  return `https://www.gravatar.com/avatar/${hash}.jpg?d=identicon`;
};

//Export the hashed data
module.exports = gravatar;
