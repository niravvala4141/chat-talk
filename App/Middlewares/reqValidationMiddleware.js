const { validationResult } = require('express-validator');

const handleValidationResults = (objReq, objRes, next) => {
  const errors = validationResult(objReq);
  if (!errors.isEmpty()) {
    return objRes.status(400).json({ 
        code: -1,
        errors: errors.array(),
        description: 'Request validation Failed'
     });
  }
  next();
};

module.exports = handleValidationResults;
