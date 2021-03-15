const { check } = require('express-validator');

// Sanitizers and validators
const validators = {
  nameVerification: check('from')
    .trim()
    .isAscii()
    .withMessage('Must contain alphanumeric characters')
    .isLength({ min: 2 })
    .withMessage('Name is too short')
  ,
  emailVerification:   check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must enter a valid email address')
  ,
  messageVerification: check('message')
    .isLength({ min: 15 })
    .withMessage(`That message is a little short. Speak up, don't be shy`)
}
  
module.exports = validators;