const objRouter = require('express').Router();
const objMessageController = require('./MessageController');
const { arrValidateMsgList, arrValidateUnreadMsg, arrValidateChatMsgList, arrValidateUpdateList } = require('./ReqValidation');
const fnHandleReqValidation = require('../../Middlewares/reqValidationMiddleware');

objRouter.get(
    '/last-messages',
    arrValidateMsgList,
    fnHandleReqValidation,
    objMessageController.fetchLastMsgList
);

objRouter.get(
    '/unread-messages',
    arrValidateUnreadMsg,
    fnHandleReqValidation,
    objMessageController.fetchUnreadMsgList
);


objRouter.get(
    '/chat-messages',
    arrValidateChatMsgList,
    fnHandleReqValidation,
    objMessageController.fetchChatMessageList
);

objRouter.put(
    '/update-messages',
    arrValidateUpdateList,
    fnHandleReqValidation,
    objMessageController.updateMessages
)
module.exports = objRouter;