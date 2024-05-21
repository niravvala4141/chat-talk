const objUserModel = require('./UserModel');

class UserController {
    constructor(){
        this.objUserModel = require('./UserModel');
    }

    /**
     * createdAt: `NiravVala`  
     * createdBy: `2024-05-21 20:13:23 IST`  
     * @param {import('express').Request}} objReq 
     * @param {import('express').Response} objRes 
     */
    async fetchChattedUserList(objReq, objRes){
        try {
            console.log('this.',)
            const objResponse = await objUserModel.getChattedUserList(objReq.query.userId, objReq.query.limit, objReq.query.start);
            return objRes.send(objResponse);
        }
        catch(objErr){
            Logger.addLog('error','Faced error during the fetching the chatted user list');
            objRes.send({
                code: -1,
                data: [],
                description: objErr.message
            })
        }
    }
}

module.exports = new UserController();