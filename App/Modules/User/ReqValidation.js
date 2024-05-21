const { query } = require('express-validator');

module.exports = {
    arrValidateChattedUser : [
        query('uid').exists().withMessage('UUID should be required').isUUID().withMessage('UID must be a valid UUID'),
        query('start').exists().withMessage('Start should be required').isInt().withMessage('Start must be a integer').toInt(),
        query('limit').exists().withMessage('Limit should be required').isInt().withMessage('Limit must be a integer').toInt()
    ],
};
