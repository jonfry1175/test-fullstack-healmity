require('dotenv').config();
const jwt = require('jsonwebtoken' );


const secret = process.env.SECRET_CODE ||"bebasCuy";

const tokenGenerator = (payload) => {
    return jwt.sign(payload, secret);
}

const tokenValidator = (token) => {
    return jwt.verify(token, secret);
}

module.exports = { tokenGenerator, tokenValidator }
