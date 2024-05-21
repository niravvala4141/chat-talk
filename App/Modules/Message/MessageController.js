const objMessageModel = require('./MessageModel');

class MessageController {

    /**
     * createdAt: `NiravVala`  
     * createdBy: `2024-05-21 20:55:13 IST`  
     * @param {import('express').Request}} objReq 
     * @param {import('express').Response} objRes 
     */
    async fetchLastMsgList(objReq, objRes){
        try {
            const objResponse = await objMessageModel.getLastMsgList(objReq.query.userId, objReq.query.limit, objReq.query.start);
            return objRes.send(objResponse);
        }
        catch(objErr){
            Logger.addLog('error','Faced error during the fetching the last message list');
            objRes.send({
                code: -1,
                data: [],
                description: objErr.message
            })
        }
    }

    /**
     * createdAt: `NiravVala`  
     * createdBy: `2024-05-21 21:27:29 IST`  
     * @param {import('express').Request}} objReq 
     * @param {import('express').Response} objRes 
     */
    async fetchUnreadMsgList(objReq, objRes){
        try {
            const objResponse = await objMessageModel.getUnreadMsgList(objReq.query.uid, objReq.query.limit, objReq.query.start);
            return objRes.send(objResponse);
        }
        catch(objErr){
            Logger.addLog('error','Faced error during the fetching the unread message list');
            objRes.send({
                code: -1,
                data: [],
                description: objErr.message
            })
        }
    }

    /**
     * createdAt: `NiravVala`  
     * createdBy: `2024-05-21 21:44:07 IST`  
     * @param {import('express').Request}} objReq 
     * @param {import('express').Response} objRes 
     */
    async fetchChatMessageList(objReq, objRes){
        try {
            const objResponse = await objMessageModel.getChatMessageList(objReq.query.uid, objReq.query.to_user_id, objReq.query.start);
            return objRes.send(objResponse);
        }
        catch(objErr){
            Logger.addLog('error','Faced error during the chat message list');
            objRes.send({
                code: -1,
                data: [],
                description: objErr.message
            })
        }
    }

    /**
     * createdAt: `NiravVala`  
     * createdBy: `2024-05-21 21:44:07 IST`  
     * @param {import('express').Request}} objReq 
     * @param {import('express').Response} objRes 
     */
    async updateMessages(objReq, objRes){
        try {
            const objResponse = await objMessageModel.updateMessages(objReq.body.message, objReq.body.msg_id);
            return objRes.send(objResponse);
        }
        catch(objErr){
            Logger.addLog('error','Faced error during the update the messages');
            objRes.send({
                code: -1,
                data: [],
                description: objErr.message
            })
        }
    }
}

module.exports = new MessageController();