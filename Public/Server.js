const express = require('express');
const objHttpApp = express();

const Path = require('path');

/** Logger object globally avaialble so useble throughout the project without import that */
global.Logger = require('../App/Services/Logger');

/** Configure the .env file */
require('dotenv').config({ path: Path.join(__dirname, '..','.env')});

/**
 * Cofiguraion for the Logger Setup
 */
require('../App/Services/Logger').init();

/**
 * Cofiguraion for the Database Setup
 */
require('../App/Services/DBSetup').init();


/** Configuration of the router list */
objHttpApp.use('/user',require('../App/Modules/User/Router'));
objHttpApp.use('/message',require('../App/Modules/Message/Router'));


const PORT = process.env.PORT || 9000;

objHttpApp.listen(PORT, () => {
    Logger.addLog('info',`Server running on port : ${PORT}`);
})

