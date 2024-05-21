class MessageModel {
    constructor(){
        this.objDb = require('../../Services/DBSetup');
    }

    /**
     * createdAt: `NiravVala`  
     * createdBy: `2024-05-21 20:11:25 IST`  
     * @param {number} intUserId userid of the user to get the last message list
     * @returns {Promise<{
     *      uid: string,
     *      name: string,
     *      mobile_number: number
     * }>}
     */
    async getLastMsgList(intUserId, intLimit, intStart){
        const strSql = `
            WITH latest_messages AS (
                SELECT
                    chat_room_id,
                    from_id,
                    to_id,
                    message,
                    created_at,
                    ROW_NUMBER() OVER (
                        PARTITION BY LEAST(from_id, to_id), 
                        GREATEST(from_id, to_id) 
                        ORDER BY created_at DESC
                    ) AS rn
                FROM
                    chat_room_dtl
                WHERE
                    from_id = $1 OR to_id = $1
            )
            SELECT
                lm.chat_room_id,
                lm.from_id,
                lm.to_id,
                lm.message,
                lm.created_at,
                u.id,
                u.uid,
                u.name,
                u.email,
                u.mobile_number
            FROM
                latest_messages lm
            JOIN
                "user" u ON (u.uid = lm.from_id OR u.uid = lm.to_id)
            WHERE
                lm.rn = 1
                AND u.uid != $1
            ORDER BY
                lm.created_at DESC
            LIMIT $2
            OFFSET $3;`;
        return await this.objDb.executeQuery(strSql, [intUserId, intLimit, intStart]);
    }

    /**
     * createdAt: `NiravVala`  
     * createdBy: `2024-05-21 21:28:19 IST`  
     * @param {number} intLimit Limit to get the unread msg from the start 
     * @param {number} intStart Starting of the unread msg should start
     * @returns {Promise<{
     *      id: number,
     *      uid: string,
     *      name: string
     *      email: string
     *      mobile_number: string
     * }>}
     */
   async getUnreadMsgList(intLimit, intStart){
       const strSql = `
            SELECT
                u.id,
                u.uid,
                u.name,
                u.email,
                u.mobile_number,
                COUNT(*) AS unread_message_count
            FROM
                "user" u
            LEFT JOIN
                chat_room_dtl crd ON u.uid = crd.to_id
            WHERE
                crd.is_read = FALSE
            GROUP BY
                u.id,
                u.uid,
                u.name,
                u.email,
                u.mobile_number
            ORDER BY
                u.id
            LIMIT $1 OFFSET $2;`;
       return await this.objDb.executeQuery(strSql, [intLimit, intStart]);
   }

    /**
     * createdAt: `NiravVala`  
     * createdBy: `2024-05-21 21:45:50 IST`  
     * @param {number} intUid User id which want to show data with another user
     * @param {number} intToUserId Another user id
     * @param {number} intStart Starting of the unread msg should start
     * @returns {Promise<{
     *      message_id: number,
     *      chat_room_id: string,
     *      from_id: string
     *      to_id: string
     *      message: string
     *      created_at: date
     *      from_user_name: string
     *      from_user_email: string
     *      from_user_mobile: string
     * }>}
     */
    async getChatMessageList(intUid, intToUserId, intStart){
        const strSql = `
            SELECT
                crd.id AS message_id,
                crd.chat_room_id,
                crd.from_id,
                crd.to_id,
                crd.message,
                crd.created_at,
                u.name AS from_user_name,
                u.email AS from_user_email,
                u.mobile_number AS from_user_mobile
            FROM
                chat_room_dtl crd
            JOIN
                "user" u ON crd.from_id = u.uid
            WHERE
                (crd.from_id = $1 AND crd.to_id = $2)
                OR (crd.from_id = $2 AND crd.to_id = $1)
            ORDER BY
                crd.created_at DESC
            LIMIT 15 OFFSET $3;
            `;
        return await this.objDb.executeQuery(strSql, [intUid, intToUserId,intStart]);
    }

    /**
     * createdAt: `NiravVala`  
     * createdBy: `2024-05-21 21:58:54 IST`  
     * @param {number} strMessage updated message
     * @param {number} intMsgId message id
     */
    async updateMessage(strMessage, intMsgId){
       const strSql = `
            UPDATE chat_room_dtl
            SET message = $1, updated_at = NOW()
            WHERE id = $2 AND is_read = FALSE
            RETURNING *;`;
       return await this.objDb.executeQuery(strSql, [strMessage, strMsgId]);
    }
}

module.exports = new MessageModel();