
const { Pool } = require('pg');
class DBSetup {
    constructor(){
        this.objDBClient = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });
    }

    async init(){
        try{
            this.objDBClient.connect();
            Logger.addLog('info','Database connected successfully');
        }
        catch(objError){
            Logger.addLog('error','Error during the database connection',objError);
        }
    }

    /**
     * createdBy : `NiravVala`
     * createdAt : `2024-05-21 19:54:43 IST`
     * About     : This method used to execute the query statement
     * @param {string} strSql Query statement need to exccute
     * @param {Array} arrParams Quey Parameters
     * @returns 
     */
    async executeQuery(strSql, arrParams = []){
        try {   
            const objResponse = await this.objDBClient.query(strSql, arrParams);
            return {
                code: 1,
                data: objResponse.rows,
                description: 'Success'   
            }
        }
        catch(objError){
            Logger.addLog('error','Error during query executation', objError);
            return {
                code: -1,
                data: [],
                description: 'Server Error | Query Failed'
            }
        }
    }

}
module.exports = new DBSetup();