const objRouter = require('express').Router();
const objUserController = require('./UserController');
const { arrValidateChattedUser } = require('./ReqValidation');
const fnHandleReqValidation = require('../../Middlewares/reqValidationMiddleware');

objRouter.get(
    '/chatted-user',
    arrValidateChattedUser,
    fnHandleReqValidation,
    objUserController.fetchChattedUserList
);

module.exports = objRouter;