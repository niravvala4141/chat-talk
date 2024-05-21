const { query } = require('express-validator');
const arrPaginationValidation = [
    query('start').isInt().withMessage('Start must be a integer').toInt(),
    query('limit').isInt().withMessage('Limit must be a integer').toInt()
]
module.exports = {
    arrValidateMsgList : [
        query('uid').isUUID().withMessage('UID must be a valid UUID').toInt(),
        ...arrPaginationValidation
    ],

    arrValidateUnreadMsg : [
        ...arrPaginationValidation
    ],

    arrValidateChatMsgList : [
        query('uid').isInt().withMessage("User's userid must be required").toInt(),
        query('to_user_id').isInt().withMessage('To user id must be required').toInt(),
        query('limit').isInt().withMessage('Limit must be a integer').toInt()
    ],

    arrValidateUpdateList: [
        body('message').exists().withMessage('message shoudl be required'),
        body('msg_id').exists().withMessage('Message id should be required')
    ]
};
