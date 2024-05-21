class UserModel {
    constructor(){
        this.objDb = require('../../Services/DBSetup');
    }

    /**
     * createdAt: `NiravVala`  
     * createdBy: `2024-05-21 20:11:25 IST`  
     * @param {number} intUserId userid of the user to get the recentally chatted user list
     * @param {number} intLimit Limit to get the no of user name
     * @param {number} intStart used for the pagination to get the data from the starting
     * @returns {Promise<{
     *      id: number
     *      uid: string,
     *      name: string,
     *      email: number
     *      mobile_number: number
     * }>}
     */
    async getChattedUserList(intUserId, intLimit = 20, intStart = 1){
        const strSql = `
            SELECT DISTINCT
                u.id,
                u.uid,
                u.name,
                u.email,
                u.mobile_number
            FROM
                "user" u
            JOIN
                chat_room_dtl crd ON u.uid = crd.from_id OR u.uid = crd.to_id
            WHERE
                (crd.from_id = $1 OR crd.to_id = $1)
                AND u.uid != $1
            ORDER BY
                crd.created_at DESC
            LIMIT $2
            OFFSET $3;`;
        return await this.objDb.executeQuery(strSql, [intUserId, intLimit, intStart ]);
    }
}

module.exports = new UserModel();