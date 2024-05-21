const fs = require('fs').promises;
const Path = require('path');
class Logger {
    constructor() {
        this.strFileName = new Date().toISOString().split('T')[0] + '.log';
        this.strLogPath = Path.join(__dirname, '..', '..', 'Storage', 'Logs', this.strFileName);
        
    }

    init() {
        /**
         * Create the logfile
         */
        try {
            const objDtl = {
                type: 'info',
                message: 'Logger initialled successfully',
                details: {},
                time: new Date()
            }
            fs.writeFile(this.strLogPath, JSON.stringify(objDtl),'utf-8');
        }
        catch (objErr) {
            console.log('Error to Logger initiallization');
        }
    }

    /**
     * createdBy : `NiravVala`    
     * createdAt : `2024-05-21 18:03:02 IST`  
     * @param {string} strType Type of the message `info`, `error`, `warning`
     * @param {string} strMessage Type of the message
     * @param {object} objLogger External data need to show on the logger
     */
    addLog(strType = 'info', strMessage = '', objLogger = {}) {
        const objDtl = {
            type: strType,
            message: strMessage,
            details: objLogger,
            time: new Date()
        }
        fs.appendFile(this.strLogPath,'\n' + JSON.stringify(objDtl),(objErr) => {
            console.log('Error to appending the logger information : ',objErr.message);
        })
    }
}

module.exports = new Logger();